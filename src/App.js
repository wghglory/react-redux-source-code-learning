import React from 'react';

import { Provider } from '../react-redux-class';
// import { Provider } from '../react-redux-function';

import './styles.css';

import store from './store';

import Demo from './pages/Demo';

export default function App() {
  return (
    <Provider store={store}>
      <Demo />
    </Provider>
  );
}
