import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import CVBuilderPage from './pages/CVBuilderPage'

function App() {
  const [user, setUser] = useState(null)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header user={user} setUser={setUser} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/register" element={<RegisterPage setUser={setUser} />} />
            <Route path="/dashboard" element={<DashboardPage user={user} />} />
            <Route path="/cv-builder" element={<CVBuilderPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
