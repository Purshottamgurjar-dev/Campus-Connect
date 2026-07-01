import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import ConnectedInteractive from './components/connectedInteractive/ConnectedInteractive'
import BrowseSkills from './components/BrowseSkills/BrowseSkills'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ConnectedInteractive />} />
        <Route path="/skills" element={<BrowseSkills />} />
      </Routes>
    </>
  )
} 
export default App
