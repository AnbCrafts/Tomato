import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import {Route,Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import DefaultPage from './Components/DefaultPage/DefaultPage'
// import Default from './Components/Default/Default'


export default function App() {
   const url = 'http://localhost:4000'
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
     
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path = '/add' element={<Add url={url}/>}/>
          <Route path = '/list' element={<List url={url}/>}/>
          <Route path = '/orders' element={<Orders url={url}/>}/>
        </Routes>
      </div>
      
    </div>
  )
}
