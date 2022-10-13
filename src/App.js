import React from 'react'
import 'normalize.css'
import 'src/assets/styles/global.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RoutesSetup from './RoutesSetup'

function App() {
  return (
    <div className="App">
      <RoutesSetup></RoutesSetup>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App
