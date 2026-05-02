import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { Navigate } from 'react-router-dom'
import OtpPage from './pages/OtpPage'
import ProtectedRoutes from './components/ProtectedRoutes'
import ProfilePage from './pages/ProfilePage'


function App() {

  return (
    <>
      <Routes>
        <Route path="/signup"  element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/verify-email" element={<OtpPage/>} />
        <Route element={<ProtectedRoutes/>} >
          <Route path="/home" element={<ProfilePage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
