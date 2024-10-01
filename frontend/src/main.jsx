import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { store } from './Components/Redux/Store.js'
import {Provider} from 'react-redux'
import StoreContextProvider from './context/StoreContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <Provider store = {store}>
    <App />
    </Provider>
    </StoreContextProvider>
  </BrowserRouter>
)
