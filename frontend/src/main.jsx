import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { GlobalProvider } from '../Context/globalContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </GlobalProvider>
)
