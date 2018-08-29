import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware'

axios.defaults.baseURL = 'http://localhost:3000/api';

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
