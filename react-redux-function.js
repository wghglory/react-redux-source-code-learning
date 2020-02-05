import React, { useContext, useState, useEffect } from 'react';

const Context = React.createContext();

export function Provider(props) {
  return <Context.Provider value={props.store}>{props.children} </Context.Provider>;
}

export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => Cmp => {
  return () => {
    const store = useContext(Context);

    const getProps = () => {
      const stateProps = mapStateToProps(store.getState());
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
      return { ...stateProps, ...dispatchProps };
    };

    const [props, setProps] = useState({ ...getProps() });

    useEffect(() => {
      store.subscribe(() => {
        setProps({ ...props, ...getProps() });
      });
    });

    return <Cmp {...props} />;
  };
};

function bindActionCreator(creator, dispatch) {
  // 把 {add:()=>({type:'add'})} 转换成 {add:(...args) => dispatch(add(...args))}
  return (...args) => dispatch(creator(...args));
}

export function bindActionCreators(creators, dispatch) {
  // import { add, minus } from './actions'
  // 把这些 actionCreators 一一遍历，装配到空对象上，actionCreator 名字和 mapDispatchToProps 的 keys 一样
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch);
    return ret;
  }, {});
}
