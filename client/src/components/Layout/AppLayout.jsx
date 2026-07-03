import { useState } from 'react'
import Navbar2 from '../Navbar/Navbar2'
import HomePage from '../Home/HomePage'
import SkillDetailsPage from '../SkillDetails/SkillDetailsPage'
import DashboardPage from '../Dashboard/DashboardPage'
import Footer from '../Footer/Footer'
import AuthModal from '../Navbar/AuthModal'

export default function AppLayout() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCard, setSelectedCard] = useState(null);
  
  // Auth state (starts logged in by default with a mock user for easy development)
  const [user, setUser] = useState({
    id: "mock_user_alex",
    name: "Alex Rivers",
    email: "alex@stanford.edu",
    college: "Stanford University",
    city: "Stanford",
    bio: "CS senior with a passion for web technologies and peer mentorship.",
    skillsToTeach: ["Python", "Algorithms", "Git Version Control"],
    skillsToLearn: ["UI Design", "Figma Prototyping"]
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Most Recent");

  const handleLoginSuccess = (newToken, loggedInUser) => {
    setUser(loggedInUser);
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
      <Navbar2 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
        user={user}
        onLoginClick={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      
      {currentPage === "home" ? (
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
  );
}
