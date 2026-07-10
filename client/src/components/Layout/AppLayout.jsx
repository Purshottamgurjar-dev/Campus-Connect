import { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import ConnectedInteractive from '../connectedInteractive/ConnectedInteractive'
import HomePage from '../Home/HomePage'
import SkillDetailsPage from '../SkillDetails/SkillDetailsPage'
import DashboardPage from '../Dashboard/DashboardPage'
import Footer from '../Footer/Footer'
import Login from '../../pages/Login/Login'
import Signup from '../../pages/signup/Signup'

export default function AppLayout() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCard, setSelectedCard] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  
  // Auth state starts logged out by default.
  const [user, setUser] = useState(null);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Most Recent");

  const handleLoginSuccess = (newToken, loggedInUser) => {
    setUser(loggedInUser);
    setLoginOpen(false);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("home");
  };

  const handleNavigate = (page, card = null) => {
    setCurrentPage(page);
    if (card) {
      setSelectedCard(card);
    }
    window.scrollTo(0, 0);
  };

  // Skip global layout headers/footers when viewing dashboard
  if (currentPage === "dashboard") {
    return (
      <DashboardPage 
        onNavigate={handleNavigate} 
        user={user} 
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <>
      <Navbar 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
        user={user}
        onLoginClick={() => setLoginOpen(true)}
        onGetStartedClick={() => setSignupOpen(true)}
        onLogout={handleLogout}
      />
      
      {!user ? (
        <ConnectedInteractive />
      ) : currentPage === "home" ? (
        <HomePage 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          onViewDetails={(card) => handleNavigate("detail", card)}
        />
      ) : (
        <SkillDetailsPage 
          selectedCard={selectedCard} 
          onNavigate={handleNavigate} 
          user={user}
          onLoginClick={() => setLoginOpen(true)}
        />
      )}
      
      <Footer />

      <Login
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <Signup
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        onSignupSuccess={handleLoginSuccess}
        onSwitchToLogin={() => {
          setSignupOpen(false);
          setLoginOpen(true);
        }}
      />
    </>
  );
}
