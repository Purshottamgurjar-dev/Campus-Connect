import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar2 from './components/Navbar/Navbar2'
import Hero from './components/Hero/Hero'
import CategoryBar from './components/CategoryBar/CategoryBar'
import SkillCardGrid from './components/SkillCardGrid/SkillCardGrid'
import CtaBanner from './components/CtaBanner/CtaBanner'
import SkillDetailsPage from './components/SkillDetails/SkillDetailsPage'
import Footer from './components/Footer/Footer'
import './App.css'
import ConnectedInteractive from './components/connectedInteractive/ConnectedInteractive'
import BrowseSkills from './components/BrowseSkills/BrowseSkills'

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
<<<<<<< HEAD
      <Navbar2 onNavigate={handleNavigate} currentPage={currentPage} />
      {currentPage === "home" ? (
        <>
          <Hero />
          <CategoryBar />
          <SkillCardGrid onViewDetails={() => handleNavigate("detail")} />
          <CtaBanner />
        </>
      ) : (
        <SkillDetailsPage onNavigate={handleNavigate} />
      )}
      <Footer />
=======
      <Navbar />
      <Routes>
        <Route path="/" element={<ConnectedInteractive />} />
        <Route path="/skills" element={<BrowseSkills />} />
      </Routes>
>>>>>>> 76ee43779bdd7e9b18e1094329dbc54e7d87fff1
    </>
  )
} 
export default App
