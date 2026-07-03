import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import Footer from "../Footer/Footer";
import StatsRow from "./StatsRow";
import UpcomingSessionsCard from "./UpcomingSessionsCard";
import LearningProgressCard from "./LearningProgressCard";
import RecentActivityCard from "./RecentActivityCard";
import QuickActions from "./QuickActions";
import { 
  fetchMySessions, 
  updateSessionStatus, 
  fetchSkills, 
  createSkillListing, 
  updateMyProfile 
} from "../../services/Api";
import "./DashboardPage.css";

export default function DashboardPage({ onNavigate, user, onLogout }) {
  const [activeItem, setActiveItem] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Dashboard list data states
  const [sessions, setSessions] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localUser, setLocalUser] = useState(user || {});
  const [requestFilter, setRequestFilter] = useState("All");

  // Form states
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCategory, setNewCategory] = useState("Coding");
  const [newAvailability, setNewAvailability] = useState("Available Weekends");
  const [newBio, setNewBio] = useState("");
  const [newTeachesRaw, setNewTeachesRaw] = useState("");
  const [submittingSkill, setSubmittingSkill] = useState(false);

  // Profile Edit states
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profileCollege, setProfileCollege] = useState(user?.college || "");
  const [profileCity, setProfileCity] = useState(user?.city || "");
  const [profileBio, setProfileBio] = useState(user?.bio || "");
  const [newTeachTag, setNewTeachTag] = useState("");
  const [newLearnTag, setNewLearnTag] = useState("");
  const [teachTags, setTeachTags] = useState(user?.skillsToTeach || []);
  const [learnTags, setLearnTags] = useState(user?.skillsToLearn || []);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const currentUserId = user?.id || user?._id;

  // Fetch all needed dashboard data on mount or when active item changes
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      if (currentUserId) {
        const sessionData = await fetchMySessions();
        setSessions(sessionData);

        const skillsData = await fetchSkills();
        setAllSkills(skillsData);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [currentUserId, activeItem]);

  // Sync profile edit state when user changes
  useEffect(() => {
    if (user) {
      setLocalUser(user);
      setProfileName(user.name || "");
      setProfileCollege(user.college || "");
      setProfileCity(user.city || "");
      setProfileBio(user.bio || "");
      setTeachTags(user.skillsToTeach || []);
      setLearnTags(user.skillsToLearn || []);
    }
  }, [user]);

  const handleSidebarClick = (itemName) => {
    if (itemName === "Logout") {
      onLogout();
      return;
    }
    setActiveItem(itemName);
    setSidebarOpen(false);
  };

  // Status handlers
  const handleUpdateStatus = async (bookingId, status) => {
    try {
      await updateSessionStatus(bookingId, status);
      alert(`Session ${status.toLowerCase()} successfully.`);
      loadDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || `Failed to update status. Please try again.`);
    }
  };

  // Create skill listing handler
  const handleCreateSkill = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newCategory) {
      alert("Please fill in all required fields.");
      return;
    }

    setSubmittingSkill(true);
    try {
      const teachesArray = newTeachesRaw
        ? newTeachesRaw.split(",").map(t => t.trim()).filter(Boolean)
        : [newCategory];

      await createSkillListing({
        title: newTitle,
        description: newDesc,
        category: newCategory,
        availability: newAvailability,
        tutorBio: newBio || localUser.bio || "",
        tutorTeaches: teachesArray
      });

      alert("New skill listed successfully!");
      setSkillModalOpen(false);
      
      // Reset form fields
      setNewTitle("");
      setNewDesc("");
      setNewCategory("Coding");
      setNewAvailability("Available Weekends");
      setNewBio("");
      setNewTeachesRaw("");
      
      loadDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create skill listing. Please try again.");
    } finally {
      setSubmittingSkill(false);
    }
  };

  // Update profile handler
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      const updated = await updateMyProfile({
        name: profileName,
        college: profileCollege,
        city: profileCity,
        bio: profileBio,
        skillsToTeach: teachTags,
        skillsToLearn: learnTags
      });
      setLocalUser(updated);
      // Sync global user state in App.jsx if needed (the user can see changes upon refresh/navigation)
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setUpdatingProfile(false);
    }
  };

  // Filter calculations
  const myListedSkills = allSkills.filter(
    skill => (skill.userId?._id || skill.userId) === currentUserId
  );
  
  const mySentRequests = sessions.filter(
    session => (session.studentId?._id || session.studentId) === currentUserId
  );
  
  const myReceivedRequests = sessions.filter(
    session => (session.tutorId?._id || session.tutorId) === currentUserId
  );

  const myConfirmedSessions = sessions.filter(s => s.status === "Confirmed");
  const myPendingRequests = myReceivedRequests.filter(s => s.status === "Pending");

  // Stats
  const listedSkillsCount = myListedSkills.length;
  const pendingRequestsCount = myPendingRequests.length;
  const upcomingSessionsCount = myConfirmedSessions.length;
  const averageRating = myListedSkills.reduce((acc, curr) => acc + (curr.rating || 5), 0) / (listedSkillsCount || 1);

  // Capitalize name for welcome greeting
  const displayName = localUser.name ? localUser.name.charAt(0).toUpperCase() + localUser.name.slice(1) : "Student";

  // Sidebar tag helpers
  const handleAddTeachTag = (e) => {
    e.preventDefault();
    if (newTeachTag.trim() && !teachTags.includes(newTeachTag.trim())) {
      setTeachTags([...teachTags, newTeachTag.trim()]);
      setNewTeachTag("");
    }
  };

  const handleAddLearnTag = (e) => {
    e.preventDefault();
    if (newLearnTag.trim() && !learnTags.includes(newLearnTag.trim())) {
      setLearnTags([...learnTags, newLearnTag.trim()]);
      setNewLearnTag("");
    }
  };

  const removeTeachTag = (tag) => {
    setTeachTags(teachTags.filter(t => t !== tag));
  };

  const removeLearnTag = (tag) => {
    setLearnTags(learnTags.filter(t => t !== tag));
  };

  return (
    <div className="dashboard-page-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeItem={activeItem}
        onItemClick={handleSidebarClick}
        isOpen={sidebarOpen}
      />

      {/* Main Content Area */}
      <main className="dashboard-main-content">
        {/* Top Dashboard Header */}
        <DashboardHeader
          profileName={localUser.name || "Alex Rivers"}
          activeItem={activeItem}
          onProfileClick={() => setActiveItem("Profile")}
        />

        {loading ? (
          <div style={{ display: "flex", flexGrow: 1, justifyContent: "center", alignItems: "center", minHeight: "400px", color: "#6366f1", fontSize: "18px", fontWeight: "600" }}>
            Loading dashboard data...
          </div>
        ) : (
          <>
            {/* View 1: Overview */}
            {activeItem === "Overview" && (
              <>
                {/* Welcome Greeting Header */}
                <div style={{ textAlign: "left", marginBottom: "32px", marginTop: "8px" }}>
                  <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                    Welcome back, {displayName} 👋
                  </h1>
                  <p style={{ color: "#6b7280", fontSize: "15px", margin: "6px 0 0 0" }}>
                    Keep learning, teaching, and growing with your campus community.
                  </p>
                </div>

                {/* Summary Statistics Cards Row */}
                <StatsRow 
                  listedSkillsCount={listedSkillsCount}
                  pendingRequestsCount={pendingRequestsCount}
                  upcomingSessionsCount={upcomingSessionsCount}
                  averageRating={listedSkillsCount > 0 ? averageRating : 5.0}
                />

                {/* Main Grid Content Panels */}
                <div className="dashboard-grid-content" style={{ marginBottom: "40px" }}>
                  {/* Left Column: Sessions & Progress */}
                  <div className="dashboard-left-column">
                    <UpcomingSessionsCard sessions={sessions} />
                    
                    <LearningProgressCard />
                  </div>

                  {/* Right Column: Actions & Timeline */}
                  <div className="dashboard-right-column">
                    <QuickActions 
                      onCreateListing={() => setSkillModalOpen(true)}
                      onBrowseSkills={() => onNavigate("home")}
                      onIncomingRequests={() => setActiveItem("Incoming Requests")}
                      incomingRequestsCount={pendingRequestsCount}
                    />

                    <RecentActivityCard />
                  </div>
                </div>
              </>
            )}

            {/* View 2: My Skills */}
            {activeItem === "My Skills" && (
              <div className="dashboard-section-card">
                <div className="dashboard-section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", borderBottom: "none" }}>
                  <div style={{ textAlign: "left" }}>
                    <h2 className="dashboard-section-title" style={{ fontSize: "32px", fontWeight: "700", color: "#0f172a", margin: 0 }}>My Skills</h2>
                    <p style={{ color: "#64748b", fontSize: "15px", margin: "8px 0 0 0" }}>Manage the skills and topics you offer to other students.</p>
                  </div>
                  <button className="dashboard-btn-primary" style={{ backgroundColor: "#4f46e5", padding: "12px 24px", borderRadius: "12px", border: "none", color: "#ffffff", fontWeight: "600", fontSize: "15px", cursor: "pointer", boxShadow: "0 4px 6px -1px rgba(79, 70, 229, 0.15)", transition: "all 0.2s ease" }} onClick={() => setSkillModalOpen(true)}>
                    + Create New Listing
                  </button>
                </div>
                {myListedSkills.length === 0 ? (
                  <p style={{ color: "#6b7280", margin: "20px 0" }}>You haven't listed any skills yet. Share your knowledge with other students!</p>
                ) : (
                  <>
                    <div className="my-skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "24px" }}>
                      {myListedSkills.map(skill => {
                        const isDraft = skill.status === "Draft";
                        const formattedDate = skill.createdAt 
                          ? new Date(skill.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) 
                          : "Jan 12, 2024";
                        
                        return (
                          <div 
                            key={skill._id} 
                            style={{ 
                              backgroundColor: isDraft ? "#f8fafc" : "#ffffff", 
                              border: isDraft ? "1px dashed #cbd5e1" : "1px solid #e2e8f0", 
                              borderRadius: "20px", 
                              padding: "24px", 
                              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)", 
                              display: "flex", 
                              flexDirection: "column", 
                              justifyContent: "space-between", 
                              opacity: isDraft ? 0.85 : 1,
                              textAlign: "left"
                            }}
                          >
                            <div>
                              {/* Tags Row */}
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                <span style={{ 
                                  backgroundColor: "#eff6ff", 
                                  color: "#3b82f6", 
                                  fontSize: "12px", 
                                  fontWeight: "600", 
                                  padding: "4px 12px", 
                                  borderRadius: "9999px" 
                                }}>
                                  {skill.category}
                                </span>
                                
                                <span style={{ 
                                  backgroundColor: isDraft ? "#e2e8f0" : "#d1fae5", 
                                  color: isDraft ? "#475569" : "#065f46", 
                                  fontSize: "12px", 
                                  fontWeight: "600", 
                                  padding: "4px 10px", 
                                  borderRadius: "9999px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px"
                                }}>
                                  <span style={{ 
                                    width: "6px", 
                                    height: "6px", 
                                    borderRadius: "50%", 
                                    backgroundColor: isDraft ? "#475569" : "#10b981",
                                    display: "inline-block"
                                  }}></span>
                                  {skill.status || "Active"}
                                </span>
                              </div>

                              {/* Title & Description */}
                              <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: "0 0 10px 0", letterSpacing: "-0.2px" }}>
                                {skill.title}
                              </h3>
                              <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", margin: "0 0 24px 0", minHeight: "68px" }}>
                                {skill.description}
                              </p>

                              {/* Details/Metadata rows */}
                              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                                {/* Availability Row */}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b" }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                      <line x1="16" y1="2" x2="16" y2="6"></line>
                                      <line x1="8" y1="2" x2="8" y2="6"></line>
                                      <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>Availability</span>
                                  </div>
                                  <span style={{ fontWeight: "600", color: isDraft ? "#94a3b8" : "#1e293b", fontStyle: isDraft ? "italic" : "normal" }}>
                                    {skill.availability || "Not set"}
                                  </span>
                                </div>

                                {/* Engagement Row */}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b" }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <line x1="18" y1="20" x2="18" y2="10"></line>
                                      <line x1="12" y1="20" x2="12" y2="4"></line>
                                      <line x1="6" y1="20" x2="6" y2="14"></line>
                                    </svg>
                                    <span>Engagement</span>
                                  </div>
                                  <span style={{ fontWeight: "700", color: isDraft ? "#94a3b8" : "#0f172a" }}>
                                    {skill.engagement || (skill.reviews > 0 ? `${skill.reviews} Requests Received` : "0 Requests")}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Card Footer Divider & Info/Actions */}
                            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: "12px", color: "#64748b" }}>
                                Created {formattedDate}
                              </span>
                              
                              <div style={{ display: "flex", gap: "12px" }}>
                                {/* View Action */}
                                <button style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", padding: 4 }} title="View Details">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                  </svg>
                                </button>
                                {/* Edit Action */}
                                <button style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", padding: 4 }} title="Edit Skill">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                  </svg>
                                </button>
                                {/* Delete Action */}
                                <button style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: 4 }} title="Delete Listing">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Summary Stats Row at the bottom of My Skills */}
                    <div className="my-skills-stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginTop: "40px" }}>
                      {/* Avg. Rating */}
                      <div style={{ backgroundColor: "#f5f3ff", border: "1px solid #e9d5ff", borderRadius: "20px", padding: "24px", display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{ backgroundColor: "#5850ec", color: "#ffffff", borderRadius: "50%", width: "48px", height: "48px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <span style={{ fontSize: "13px", color: "#6366f1", fontWeight: "600", textTransform: "none" }}>Avg. Rating</span>
                          <div style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginTop: "2px" }}>4.9 / 5.0</div>
                        </div>
                      </div>

                      {/* Hours Taught */}
                      <div style={{ backgroundColor: "#f5f3ff", border: "1px solid #e9d5ff", borderRadius: "20px", padding: "24px", display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{ backgroundColor: "#7c3aed", color: "#ffffff", borderRadius: "50%", width: "48px", height: "48px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                            <polyline points="3 3 3 8 8 8"></polyline>
                            <line x1="12" y1="7" x2="12" y2="12"></line>
                            <polyline points="12 12 16 14"></polyline>
                          </svg>
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <span style={{ fontSize: "13px", color: "#7c3aed", fontWeight: "600", textTransform: "none" }}>Hours Taught</span>
                          <div style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginTop: "2px" }}>42 Hours</div>
                        </div>
                      </div>

                      {/* Peers Helped */}
                      <div style={{ backgroundColor: "#f0f4ff", border: "1px solid #dbeafe", borderRadius: "20px", padding: "24px", display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{ backgroundColor: "#475569", color: "#ffffff", borderRadius: "50%", width: "48px", height: "48px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <span style={{ fontSize: "13px", color: "#475569", fontWeight: "600", textTransform: "none" }}>Peers Helped</span>
                          <div style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginTop: "2px" }}>18 Students</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* View 3: My Requests */}
            {activeItem === "My Requests" && (
              <div style={{ textAlign: "left", width: "100%" }}>
                {/* Header */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "32px" }}>
                  <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: 0 }}>My Requests</h1>
                  <p style={{ color: "#64748b", fontSize: "15px", margin: 0 }}>Track all the sessions you requested from other students.</p>
                </div>

                {/* Filters Row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
                  {/* Status Pills Capsule Container */}
                  <div style={{ 
                    display: "flex", 
                    gap: "6px", 
                    backgroundColor: "#eff3fa", 
                    padding: "6px", 
                    borderRadius: "9999px",
                    border: "none",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)"
                  }}>
                    {["All", "Pending", "Accepted", "Declined", "Completed"].map((filterOpt) => {
                      const isActive = requestFilter === filterOpt;
                      return (
                        <button
                          key={filterOpt}
                          onClick={() => setRequestFilter(filterOpt)}
                          style={{
                            padding: "10px 24px",
                            borderRadius: "9999px",
                            border: "none",
                            backgroundColor: isActive ? "#ffffff" : "transparent",
                            color: isActive ? "#4f46e5" : "#475569",
                            fontWeight: isActive ? "700" : "600",
                            fontSize: "14px",
                            cursor: "pointer",
                            boxShadow: isActive ? "0 4px 10px rgba(79, 70, 229, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02)" : "none",
                            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                          }}
                        >
                          {filterOpt === "All" ? "All Requests" : filterOpt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Filter by Date Dropdown */}
                  <div style={{ position: "relative" }}>
                    <button style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 24px",
                      borderRadius: "9999px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#f0f4fa",
                      color: "#1e293b",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}>
                      <span>Filter by Date</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Request Grid */}
                {mySentRequests.length === 0 ? (
                  <p style={{ color: "#6b7280" }}>You haven't requested any learning sessions yet.</p>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "24px", position: "relative" }}>
                    {mySentRequests
                      .filter(req => requestFilter === "All" || req.status === requestFilter)
                      .map((req) => {
                        const statusColor = 
                          req.status === "Accepted" ? { bg: "#eff6ff", text: "#3b82f6", stroke: "#3b82f6" } :
                          req.status === "Pending" ? { bg: "#f1f5f9", text: "#475569", stroke: "#475569" } :
                          req.status === "Completed" ? { bg: "#f3e8ff", text: "#7928ca", stroke: "#7928ca" } :
                          { bg: "#fef2f2", text: "#ef4444", stroke: "#ef4444" };

                        // Dynamic SVG Icon based on Subject
                        let subjectIcon = (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                          </svg>
                        );
                        let iconBgColor = "#e0e7ff";
                        
                        const subj = req.subject.toLowerCase();
                        if (subj.includes("react") || subj.includes("code") || subj.includes("program")) {
                          subjectIcon = (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="16 18 22 12 16 6"></polyline>
                              <polyline points="8 6 2 12 8 18"></polyline>
                            </svg>
                          );
                          iconBgColor = "#eff6ff";
                        } else if (subj.includes("calculus") || subj.includes("math")) {
                          subjectIcon = (
                            <span style={{ fontSize: "16px", fontWeight: "700", fontFamily: "serif", color: "#6366f1" }}>Σ</span>
                          );
                          iconBgColor = "#f5f3ff";
                        } else if (subj.includes("design") || subj.includes("ui") || subj.includes("figma")) {
                          subjectIcon = (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                              <path d="M12 8A2 2 0 1 0 12 4A2 2 0 1 0 12 8Z"></path>
                              <path d="M6 12A2 2 0 1 0 6 8A2 2 0 1 0 6 12Z"></path>
                              <path d="M18 12A2 2 0 1 0 18 8A2 2 0 1 0 18 12Z"></path>
                              <path d="M12 18A2 2 0 1 0 12 14A2 2 0 1 0 12 18Z"></path>
                            </svg>
                          );
                          iconBgColor = "#f5f3ff";
                        } else if (subj.includes("spanish") || subj.includes("language") || subj.includes("conversation")) {
                          subjectIcon = (
                            <span style={{ fontSize: "14px", fontWeight: "700", color: "#ef4444" }}>文A</span>
                          );
                          iconBgColor = "#fef2f2";
                        }

                        const getStatusBadgeIcon = (status) => {
                          if (status === "Accepted") {
                            return (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}>
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                            );
                          }
                          if (status === "Pending") {
                            return (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}>
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                              </svg>
                            );
                          }
                          if (status === "Completed") {
                            return (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}>
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            );
                          }
                          return (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}>
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="15" y1="9" x2="9" y2="15"></line>
                              <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                          );
                        };

                        return (
                          <div
                            key={req._id}
                            style={{
                              backgroundColor: "#ffffff",
                              border: "1px solid #e2e8f0",
                              borderRadius: "24px",
                              padding: "28px",
                              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              textAlign: "left"
                            }}
                          >
                            <div>
                              {/* Header Row */}
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                                  {/* Left Circle Icon */}
                                  <div style={{
                                    backgroundColor: iconBgColor,
                                    borderRadius: "14px",
                                    width: "44px",
                                    height: "44px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "#6366f1",
                                    flexShrink: 0
                                  }}>
                                    {subjectIcon}
                                  </div>
                                  
                                  {/* Subject & Tutor name */}
                                  <div>
                                    <h4 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                                      {req.subject}
                                    </h4>
                                    <span style={{ fontSize: "14px", color: "#64748b", display: "block", marginTop: "2px" }}>
                                      with <strong style={{ color: "#334155" }}>{req.tutorId?.name || "Tutor"}</strong> • {req.tutorId?.school || "Stanford University"}
                                    </span>
                                  </div>
                                </div>

                                {/* Status badge */}
                                <span style={{
                                  backgroundColor: statusColor.bg,
                                  color: statusColor.text,
                                  fontSize: "12px",
                                  fontWeight: "700",
                                  padding: "6px 12px",
                                  borderRadius: "9999px",
                                  display: "inline-flex",
                                  alignItems: "center"
                                }}>
                                  {getStatusBadgeIcon(req.status)}
                                  {req.status}
                                </span>
                              </div>

                              {/* Time Row (Hidden for Declined cards per mockup) */}
                              {req.status !== "Declined" && (
                                <div style={{
                                  display: "flex",
                                  gap: "16px",
                                  backgroundColor: "#f8fafc",
                                  padding: "12px 16px",
                                  borderRadius: "14px",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                  color: "#475569",
                                  marginBottom: "20px"
                                }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                      <line x1="16" y1="2" x2="16" y2="6"></line>
                                      <line x1="8" y1="2" x2="8" y2="6"></line>
                                      <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>{req.date}</span>
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <span>{req.time}</span>
                                  </div>
                                </div>
                              )}

                              {/* Note / Message Container */}
                              {req.status === "Declined" && req.tutorNote ? (
                                <div style={{
                                  backgroundColor: "#fff5f5",
                                  border: "1px solid #fecaca",
                                  color: "#881337",
                                  padding: "18px 20px",
                                  borderRadius: "14px",
                                  fontSize: "14px",
                                  lineHeight: "1.6",
                                  marginBottom: "24px"
                                }}>
                                  <strong>Note from {req.tutorId?.name.split(" ")[0] || "Tutor"}:</strong> "{req.tutorNote}"
                                </div>
                              ) : req.status === "Completed" ? (
                                <div style={{
                                  backgroundColor: "#faf5ff",
                                  border: "1.5px dashed #c084fc",
                                  color: "#7c3aed",
                                  padding: "14px 20px",
                                  borderRadius: "14px",
                                  fontSize: "15px",
                                  fontWeight: "600",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "10px",
                                  marginBottom: "24px"
                                }}>
                                  <span style={{ 
                                    display: "inline-flex", 
                                    alignItems: "center", 
                                    justifyContent: "center", 
                                    backgroundColor: "#7c3aed", 
                                    color: "#ffffff", 
                                    width: "20px", 
                                    height: "20px", 
                                    borderRadius: "50%",
                                    fontSize: "11px"
                                  }}>★</span>
                                  <span>Session successfully completed!</span>
                                </div>
                              ) : (
                                <p style={{
                                  fontSize: "14px",
                                  color: "#475569",
                                  lineHeight: "1.6",
                                  fontStyle: "italic",
                                  margin: "0 0 24px 0",
                                  borderLeft: "3.5px solid #e0e7ff",
                                  paddingLeft: "12px"
                                }}>
                                  "{req.message}"
                                </p>
                              )}
                            </div>

                            {/* Buttons */}
                            <div style={{ display: "flex", gap: "12px", width: "100%" }}>
                              {req.status === "Accepted" ? (
                                <button style={{
                                  flexGrow: 1,
                                  backgroundColor: "#4f46e5",
                                  color: "#ffffff",
                                  border: "none",
                                  borderRadius: "12px",
                                  padding: "12px 16px",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  cursor: "pointer"
                                }}>
                                  View Session Details
                                </button>
                              ) : req.status === "Pending" ? (
                                <button style={{
                                  flexGrow: 1,
                                  backgroundColor: "#f0f4fa",
                                  color: "#94a3b8",
                                  border: "none",
                                  borderRadius: "12px",
                                  padding: "12px 16px",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  cursor: "not-allowed"
                                }} disabled>
                                  Waiting for Response
                                </button>
                              ) : req.status === "Completed" ? (
                                <button style={{
                                  flexGrow: 1,
                                  backgroundColor: "#7c3aed",
                                  color: "#ffffff",
                                  border: "none",
                                  borderRadius: "12px",
                                  padding: "12px 16px",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  cursor: "pointer"
                                }}>
                                  Leave a Review
                                </button>
                              ) : (
                                <button style={{
                                  flexGrow: 1,
                                  backgroundColor: "#f0f4fa",
                                  color: "#475569",
                                  border: "none",
                                  borderRadius: "12px",
                                  padding: "12px 16px",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  cursor: "pointer"
                                }}>
                                  Reschedule Request
                                </button>
                              )}

                              <button style={{
                                border: (req.status === "Accepted" || req.status === "Completed") ? "1.5px solid #4f46e5" : "1.5px solid #e2e8f0",
                                backgroundColor: "#ffffff",
                                color: (req.status === "Accepted" || req.status === "Completed") ? "#4f46e5" : "#475569",
                                borderRadius: "12px",
                                padding: "12px 20px",
                                fontWeight: "600",
                                fontSize: "14px",
                                cursor: "pointer",
                                transition: "all 0.2s ease"
                              }}>
                                View Listing
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}

                {/* Floating Plus Button at bottom right */}
                <button 
                  onClick={() => onNavigate("home")}
                  style={{
                    position: "fixed",
                    bottom: "32px",
                    right: "32px",
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "#4f46e5",
                    color: "#ffffff",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    zIndex: 999
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
            )}

            {/* View 4: Incoming Requests */}
            {activeItem === "Incoming Requests" && (
              <div className="dashboard-section-card">
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">Session Requests Received</h2>
                </div>
                {myReceivedRequests.length === 0 ? (
                  <p style={{ color: "#6b7280" }}>You haven't received any requests for your skill listings yet.</p>
                ) : (
                  <div className="dashboard-table-container">
                    <table className="dashboard-table">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Student</th>
                          <th>Preferred Date</th>
                          <th>Preferred Time</th>
                          <th>Message</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myReceivedRequests.map(req => {
                          const studentName = req.studentId?.name || "Student";
                          return (
                            <tr key={req._id}>
                              <td style={{ fontWeight: "600" }}>{req.subject}</td>
                              <td>{studentName}</td>
                              <td>{req.date}</td>
                              <td>{req.time}</td>
                              <td><span style={{ fontSize: "12px", color: "#64748b" }}>{req.message || "-"}</span></td>
                              <td>
                                <span className={`status-badge ${req.status.toLowerCase()}`}>
                                  {req.status}
                                </span>
                              </td>
                              <td style={{ display: "flex", gap: "6px" }}>
                                {req.status === "Pending" && (
                                  <>
                                    <button 
                                      className="dashboard-btn-success"
                                      onClick={() => handleUpdateStatus(req._id, "Confirmed")}
                                    >
                                      Accept
                                    </button>
                                    <button 
                                      className="dashboard-btn-danger"
                                      onClick={() => handleUpdateStatus(req._id, "Cancelled")}
                                    >
                                      Decline
                                    </button>
                                  </>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* View 5: My Sessions */}
            {activeItem === "My Sessions" && (
              <div className="dashboard-section-card">
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">My Sessions Calendar</h2>
                </div>
                {sessions.length === 0 ? (
                  <p style={{ color: "#6b7280" }}>No confirmed or scheduled sessions found.</p>
                ) : (
                  <div className="dashboard-table-container">
                    <table className="dashboard-table">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Role</th>
                          <th>Peer Name</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sessions.map(sess => {
                          const isTutor = (sess.tutorId?._id || sess.tutorId) === currentUserId;
                          const peerName = isTutor ? (sess.studentId?.name || "Student") : (sess.tutorId?.name || "Tutor");
                          return (
                            <tr key={sess._id}>
                              <td style={{ fontWeight: "600" }}>{sess.subject}</td>
                              <td style={{ color: isTutor ? "#4f46e5" : "#059669", fontWeight: "600" }}>{isTutor ? "Mentor" : "Student"}</td>
                              <td>{peerName}</td>
                              <td>{sess.date}</td>
                              <td>{sess.time}</td>
                              <td>
                                <span className={`status-badge ${sess.status.toLowerCase()}`}>
                                  {sess.status}
                                </span>
                              </td>
                              <td>
                                {sess.status === "Confirmed" && isTutor && (
                                  <button 
                                    className="dashboard-btn-success"
                                    onClick={() => handleUpdateStatus(sess._id, "Completed")}
                                  >
                                    Mark Completed
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* View 6: Profile */}
            {activeItem === "Profile" && (
              <div className="dashboard-section-card">
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">My Profile Settings</h2>
                </div>
                <form onSubmit={handleUpdateProfile}>
                  <div className="dashboard-form-grid">
                    <div className="form-group">
                      <label htmlFor="prof-name">Full Name</label>
                      <input 
                        id="prof-name"
                        type="text" 
                        className="form-input" 
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="prof-college">College / University</label>
                      <input 
                        id="prof-college"
                        type="text" 
                        className="form-input" 
                        value={profileCollege}
                        onChange={(e) => setProfileCollege(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="prof-city">City</label>
                      <input 
                        id="prof-city"
                        type="text" 
                        className="form-input" 
                        value={profileCity}
                        onChange={(e) => setProfileCity(e.target.value)}
                      />
                    </div>

                    <div className="form-group dashboard-form-full">
                      <label htmlFor="prof-bio">Short Bio</label>
                      <textarea 
                        id="prof-bio"
                        className="form-input" 
                        style={{ height: "100px", resize: "none", fontFamily: "inherit" }}
                        value={profileBio}
                        onChange={(e) => setProfileBio(e.target.value)}
                      ></textarea>
                    </div>

                    {/* Teach Tags Input */}
                    <div className="form-group">
                      <label htmlFor="add-teach-tag">Skills I Can Teach (press Enter)</label>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input 
                          id="add-teach-tag"
                          type="text" 
                          className="form-input" 
                          style={{ flexGrow: 1 }}
                          value={newTeachTag}
                          onChange={(e) => setNewTeachTag(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleAddTeachTag(e)}
                          placeholder="e.g. Figma"
                        />
                        <button className="dashboard-btn-secondary" type="button" onClick={handleAddTeachTag}>Add</button>
                      </div>
                      <div className="profile-tags-container">
                        {teachTags.map(tag => (
                          <span key={tag} className="profile-tag">
                            {tag} <span className="profile-tag-remove" onClick={() => removeTeachTag(tag)}>×</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Learn Tags Input */}
                    <div className="form-group">
                      <label htmlFor="add-learn-tag">Skills I Want to Learn (press Enter)</label>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input 
                          id="add-learn-tag"
                          type="text" 
                          className="form-input" 
                          style={{ flexGrow: 1 }}
                          value={newLearnTag}
                          onChange={(e) => setNewLearnTag(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleAddLearnTag(e)}
                          placeholder="e.g. Python"
                        />
                        <button className="dashboard-btn-secondary" type="button" onClick={handleAddLearnTag}>Add</button>
                      </div>
                      <div className="profile-tags-container">
                        {learnTags.map(tag => (
                          <span key={tag} className="profile-tag" style={{ backgroundColor: "#ecfdf5", color: "#047857" }}>
                            {tag} <span className="profile-tag-remove" style={{ color: "#a7f3d0" }} onClick={() => removeLearnTag(tag)}>×</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="dashboard-btn-primary" type="submit" disabled={updatingProfile}>
                    {updatingProfile ? "Updating..." : "Save Profile Details"}
                  </button>
                </form>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="dashboard-footer-wrapper" style={{ marginTop: "auto", width: "100%" }}>
          <Footer />
        </div>
      </main>

      {/* Modal dialog for Listing a New Skill */}
      {skillModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", fontWeight: "700", color: "#0f172a", textAlign: "left" }}>List a New Skill on Campus</h3>
            <form onSubmit={handleCreateSkill}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="form-group">
                  <label htmlFor="new-skill-title">Listing Title</label>
                  <input 
                    id="new-skill-title"
                    type="text" 
                    className="form-input"
                    placeholder="e.g. Intro to Figma Prototyping"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-skill-category">Skill Category</label>
                  <select 
                    id="new-skill-category"
                    className="form-input"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    <option value="Coding">Coding</option>
                    <option value="Math">Math</option>
                    <option value="Design">Design</option>
                    <option value="Languages">Languages</option>
                    <option value="Music">Music</option>
                    <option value="Exam Prep">Exam Prep</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="new-skill-desc">Description</label>
                  <textarea 
                    id="new-skill-desc"
                    className="form-input" 
                    style={{ height: "80px", resize: "none", fontFamily: "inherit" }}
                    placeholder="Describe what you will teach, session formats, etc."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="new-skill-avail">Availability</label>
                  <input 
                    id="new-skill-avail"
                    type="text" 
                    className="form-input"
                    placeholder="e.g. Available Weekends / Mon-Wed Evenings"
                    value={newAvailability}
                    onChange={(e) => setNewAvailability(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-skill-bio">Bio (specifically for this skill)</label>
                  <textarea 
                    id="new-skill-bio"
                    className="form-input" 
                    style={{ height: "60px", resize: "none", fontFamily: "inherit" }}
                    placeholder="Describe your qualifications for teaching this skill..."
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="new-skill-teaches">Specific topics covered (comma separated)</label>
                  <input 
                    id="new-skill-teaches"
                    type="text" 
                    className="form-input"
                    placeholder="e.g. Auto-layout, Components, Interactive States"
                    value={newTeachesRaw}
                    onChange={(e) => setNewTeachesRaw(e.target.value)}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                  <button className="dashboard-btn-secondary" type="button" onClick={() => setSkillModalOpen(false)}>Cancel</button>
                  <button className="dashboard-btn-primary" type="submit" disabled={submittingSkill}>
                    {submittingSkill ? "Listing..." : "Publish Listing"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
