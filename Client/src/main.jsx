import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import { MenuProvider } from './Component/Global/MenuProvider.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <MenuProvider>
    <App />
  </MenuProvider>
  </BrowserRouter>
)
