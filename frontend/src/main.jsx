// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'

import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
import AuthProvider from './context/AuthContext.jsx'
ReactDom.createRoot(document.getElementById("root")).render(
<React.StrictMode>
  <AuthProvider>
  <App />
  </AuthProvider>
</React.StrictMode>
)
