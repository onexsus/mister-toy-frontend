import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './root-cmp.jsx'
import './index.css'

import './services/i18n.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,  
)
