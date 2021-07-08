import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

const render = module.hot ? ReactDOM.render : ReactDOM.hydrate;

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#root')
);

if (module.hot) {
  module.hot.accept();
}
