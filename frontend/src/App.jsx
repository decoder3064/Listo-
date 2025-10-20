import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css';



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard"element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>}/>
              <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App
