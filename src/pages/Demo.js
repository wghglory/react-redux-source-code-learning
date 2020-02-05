import React, { Component } from 'react';

import { connect } from '../../react-redux-class';
// import { connect } from '../../react-redux-function';

import { add, minus, asyncAdd } from '../actions';

class Hello extends Component {
  render() {
    const { num, add, minus, asyncAdd } = this.props;
    return (
      <div>
        <h1>React Redux source code learning</h1>
        <p>num: {num}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
        <button onClick={asyncAdd}>async add</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { num: state };
};
const mapDispatchToProps = {
  add,
  minus,
  asyncAdd
};

export default connect(
  mapStateToProps, //状态映射
  mapDispatchToProps //派发事件映射
)(Hello);
