import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#root')
);

if (module.hot) {
  module.hot.accept();
}
