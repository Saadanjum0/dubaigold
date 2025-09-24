import React from 'react'
import Mainsection from './Components/Mainsection'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './Components/Login'
import CombineDashboard from './Components/Admin/CombineDashboard'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './ProtectedRoute'   // 👈 import it
import DetailPage from './Components/Admin/Detail'

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <BrowserRouter>
        <Routes>
          <Route element={<Mainsection />} path='/' />
          <Route element={<AdminLogin />} path='/login' />
          {/* <Route element={<DetailPage />} path='/detail' /> */}



          {/* ✅ Protect admin route */}
          <Route
            path='/admin-dashboard'
            element={
              <ProtectedRoute>
                <CombineDashboard />
              </ProtectedRoute>
            }
          />
             <Route
          path='/detail/:id'
            element={
              <ProtectedRoute>
                <DetailPage />
              </ProtectedRoute>
            }
          />

           
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
