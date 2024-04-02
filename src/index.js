// Veja os arquivos abaixo e reanalise a questão do roteamento
// src/index.js

import  { StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';

//router
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'

//store

import { Provider } from 'react-redux';
//reducer
import {store} from './store'

import { IndexRouters } from './router';
import { SimpleRouter } from './router/simple-router';
import { ChatRouter } from './router/chat-router';
import { GlobalProvider } from './GlobalContext';

const router = createBrowserRouter([
  ...IndexRouters,
  ...SimpleRouter,
  ...ChatRouter
], { basename: process.env.PUBLIC_URL })

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GlobalProvider>
        <App>
          <RouterProvider router={router}>
          </RouterProvider>
        </App>
      </GlobalProvider>
    </Provider>
  </StrictMode>
)
