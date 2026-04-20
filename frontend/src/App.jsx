import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from './pages/Dashboard'
import Results from './pages/Results'

function App() {

  return (
    <>
        <AuthContextProvider>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute/> } >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/results/:id" element={<Results />} />
              {/* all protected route will be added here */}
            </Route>
          </Routes>
        </AuthContextProvider>
    </>
  )
}

export default App
