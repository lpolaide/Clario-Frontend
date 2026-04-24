import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { SubscriptionsProvider } from './hooks/useSubscriptions'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <SubscriptionsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SubscriptionsProvider>
    </ThemeProvider>
  </React.StrictMode>
)