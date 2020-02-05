import { createStore, applyMiddleware } from '../redux';
import thunk from '../redux-thunk';

function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counterReducer, applyMiddleware(thunk));

export default store;
