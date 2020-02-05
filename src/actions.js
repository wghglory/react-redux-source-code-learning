/* actions
1. by default redux supports only dispatch a object
2. by applying middlewares like redux-thunk, to dispatch a function is allowed with dispatch as parameter.
这个方法执行就会 dispatch 一个对象，需要传入 store.dispatch
*/
export const add = () => {
  return { type: 'add' };
};

export const minus = () => {
  return { type: 'minus' };
};
// export const minus = () => (dispatch) => {
//   return dispatch({ type: 'minus' });
// };

export const asyncAdd = () => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'add' });
  }, 1000);
};
