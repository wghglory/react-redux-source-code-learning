export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
    // enhancer(createStore) 实际相当于 应用了中间件的 newCreateStore
    // newCreateStore(reducer) 跟原来 createStore 一样
  }

  let currentState = undefined;
  let currentListeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action); // 通过 reducer 更新状态
    // dispatch 后执行 subscribe 里面所有方法，一般是 forceUpdate() 去更新页面内容
    currentListeners.map(cb => cb());
  }

  function subscribe(listener) {
    currentListeners.push(listener);
  }

  // dispatch so UI has initial value
  dispatch({ type: '@INIT' });

  return {
    getState,
    dispatch,
    subscribe
  };
}

// https://github.com/reduxjs/redux/blob/master/src/applyMiddleware.ts
export function applyMiddleware(...middlewares) {
  return createStore => (...reducers) => {
    console.log(`reducers`, reducers);
    const store = createStore(...reducers); // { dispatch, getState, subscribe }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: store.dispatch
    };

    // 中间件这里执行。使中间件可以获取状态值、派发action
    const chain = middlewares.map(mw => mw(middlewareAPI));
    console.log(`chains`, chain); // [fuc(dispatch){}, ...] thunk, logger 等方法执行后返回的方法们构成数组，这些 middleware 接受参数 {getState, dispatch}，返回方法 (dispatch) => (action) => { return dispatch(action) }
    const dispatch = compose(...chain)(store.dispatch); // 对所有中间件按顺序增强 dispatch 方法
    console.log(`dispatch`, dispatch); // function(action) {...return dispatch(action)}

    return {
      ...store,
      dispatch // 增强过得 dispatch 覆盖原有的
    };
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    console.log('empty');
  } else if (funcs.length === 1) {
    return funcs[0];
  } else {
    return funcs.reduce((accumulator, currentValue) => {
      return (...args) => currentValue(accumulator(...args));
    });
  }
}

// function fn1() {
//   console.log(1);
// }
// function fn2() {
//   console.log(2);
// }
// function fn3() {
//   console.log(3);
// }

// compose(
//   fn1,
//   fn2,
//   fn3
// )();
