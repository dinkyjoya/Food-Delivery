import React from 'react'
import Navbar from './component/Navbar/Navbar'
import Sidebar from './component/Sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import List from './component/pages/List/List'
import Add from './component/pages/Add/Add'
import Order from './component/pages/Orders/Order'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {

const url="https://localhost:8000";

  return (
    <div>
      <ToastContainer/>
     <Navbar/>
     <hr/>
     <div className="app-content">
      <Sidebar/>
      <Routes>
        <Route path='/add' element={<Add url={url}/>}/>
      <Route path='/list' element={<List url={url}/>}/>
        <Route path='/order' element={<Order url={url}/>}/>
      </Routes>
     </div>
    </div>
  )
}

export default App