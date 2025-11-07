import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import enMessages from './lang/en.json'
import esMessages from './lang/es.json'

const messages = {
  en: enMessages,
  es: esMessages,
}

const language = navigator.language.split(/[-_]/)[0] // Get browser language

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
