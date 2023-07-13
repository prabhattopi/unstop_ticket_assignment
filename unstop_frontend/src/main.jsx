import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TicketContextProvider } from './context/TicketContext.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
 <TicketContextProvider>
     <ToastContainer/>
    <App />
 </TicketContextProvider>

)
