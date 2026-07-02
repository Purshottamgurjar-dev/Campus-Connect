import { useState, useEffect } from 'react'
import Navbar2 from './components/Navbar/Navbar2'
import Hero from './components/Hero/Hero'
import CategoryBar from './components/CategoryBar/CategoryBar'
import SkillCardGrid from './components/SkillCardGrid/SkillCardGrid'
import CtaBanner from './components/CtaBanner/CtaBanner'
import SkillDetailsPage from './components/SkillDetails/SkillDetailsPage'
import DashboardPage from './components/Dashboard/DashboardPage'
import Footer from './components/Footer/Footer'
import AuthModal from './components/Navbar/AuthModal'
import { getMyProfile } from './services/Api'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCard, setSelectedCard] = useState(null);
  
  // Auth state
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Most Recent");

  // Fetch profile if token exists
  useEffect(() => {
    const loadProfile = async () => {
      if (token) {
        try {
          const profile = await getMyProfile();
          setUser(profile);
        } catch (err) {
          console.error("Failed to load profile:", err);
          // Token is likely invalid or expired
          handleLogout();
        }
      }
      setLoading(false);
    };

    loadProfile();
  }, [token]);

  const handleLoginSuccess = (newToken, loggedInUser) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
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

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "18px", color: "#6366f1", fontWeight: "600" }}>
        Loading CampusConnect...
      </div>
    );
  }

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
      <Navbar2 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
        user={user}
        onLoginClick={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      
      {currentPage === "home" ? (
        <>
          <Hero />
          <CategoryBar onCategoryChange={setSelectedCategory} onSortChange={setSelectedSort} />
          <SkillCardGrid 
            selectedCategory={selectedCategory} 
            selectedSort={selectedSort} 
            onViewDetails={(card) => handleNavigate("detail", card)} 
          />
          <CtaBanner />
        </>
      ) : (
        <SkillDetailsPage 
          selectedCard={selectedCard} 
          onNavigate={handleNavigate} 
          user={user}
          onLoginClick={() => setAuthModalOpen(true)}
        />
      )}
      
      <Footer />

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  )
} 
export default App
