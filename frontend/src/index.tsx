import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store/store'

import './styles/index.css'
import App from './App'
import { NotifyProvider } from './hooks/use-notify'
import Notifier from './components/notifier/notifier'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)


root.render(
  <Provider store={store}>
    <NotifyProvider Component={Notifier}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NotifyProvider>
  </Provider>,
)
