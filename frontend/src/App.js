import React from 'react'

import { BrowserRouter, Route, Routes } from "react-router-dom"

import AuthGuard from "./utils/AuthGuard"
import { AuthProvider } from './context/AuthContext'

import Home from './components/Home.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import Dashboard from './components/Dashboard.js'
import Library from './components/Library.js'
import File from './components/File.js'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route path="/file" element={<AuthGuard><File /></AuthGuard>} />
          <Route path="/library" element={<AuthGuard><Library /></AuthGuard>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App