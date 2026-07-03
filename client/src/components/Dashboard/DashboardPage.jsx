import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import Footer from "../Footer/Footer";
import StatsRow from "./StatsRow";
import UpcomingSessionsCard from "./UpcomingSessionsCard";
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
          profileName={localUser.name || "purshottam"}
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
                    
                    {/* Learning Progress */}
                    <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", padding: "24px", borderRadius: "16px", textAlign: "left" }}>
                      <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>Learning Progress</h3>
                      <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
                        You have completed <b>{sessions.filter(s => s.status === "Completed" && (s.studentId?._id || s.studentId) === currentUserId).length} sessions</b> as a student, and taught <b>{sessions.filter(s => s.status === "Completed" && (s.tutorId?._id || s.tutorId) === currentUserId).length} sessions</b> as a mentor.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Actions & Timeline */}
                  <div className="dashboard-right-column">
                    {/* Quick Actions */}
                    <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", padding: "24px", borderRadius: "16px", textAlign: "left" }}>
                      <h3 style={{ margin: "0 0 16px 0", fontSize: "14px", fontWeight: "700", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.5px" }}>Quick Actions</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <button className="dashboard-btn-primary" onClick={() => setSkillModalOpen(true)}>
                          List a New Skill
                        </button>
                        <button className="dashboard-btn-secondary" onClick={() => setActiveItem("Profile")}>
                          Update Profile Bio
                        </button>
                        <button className="dashboard-btn-secondary" onClick={() => onNavigate("home")}>
                          Browse All Skills
                        </button>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", padding: "24px", borderRadius: "16px", textAlign: "left" }}>
                      <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>Recent Activity</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", color: "#4b5563" }}>
                        {sessions.slice(0, 3).map((act, i) => {
                          const isActTutor = (act.tutorId?._id || act.tutorId) === currentUserId;
                          const name = isActTutor ? (act.studentId?.name || "Student") : (act.tutorId?.name || "Tutor");
                          return (
                            <div key={act._id || i} style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                              Session request for <b>{act.subject}</b> {isActTutor ? `received from` : `sent to`} <b>{name}</b> is currently <span className={`status-badge ${act.status.toLowerCase()}`}>{act.status}</span>.
                            </div>
                          );
                        })}
                        {sessions.length === 0 && <p style={{ margin: 0, color: "#6b7280" }}>No recent activity to show.</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* View 2: My Skills */}
            {activeItem === "My Skills" && (
              <div className="dashboard-section-card">
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">My Skill Listings</h2>
                  <button className="dashboard-btn-primary" onClick={() => setSkillModalOpen(true)}>
                    + List a New Skill
                  </button>
                </div>
                {myListedSkills.length === 0 ? (
                  <p style={{ color: "#6b7280", margin: "20px 0" }}>You haven't listed any skills yet. Share your knowledge with other students!</p>
                ) : (
                  <div className="my-skills-grid">
                    {myListedSkills.map(skill => (
                      <div key={skill._id} className="my-skill-card">
                        <div>
                          <div className="my-skill-header">
                            <h3 className="my-skill-title">{skill.title}</h3>
                            <span className={`my-skill-category ${skill.categoryClass || "coding"}`}>{skill.category}</span>
                          </div>
                          <p className="my-skill-desc">{skill.description}</p>
                        </div>
                        <div className="my-skill-footer">
                          <span>⭐ {skill.rating.toFixed(1)} ({skill.reviews} reviews)</span>
                          <span style={{ color: "#6366f1", fontWeight: "600" }}>{skill.availability}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* View 3: My Requests */}
            {activeItem === "My Requests" && (
              <div className="dashboard-section-card">
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">Session Requests Sent</h2>
                </div>
                {mySentRequests.length === 0 ? (
                  <p style={{ color: "#6b7280" }}>You haven't requested any learning sessions yet.</p>
                ) : (
                  <div className="dashboard-table-container">
                    <table className="dashboard-table">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Tutor</th>
                          <th>Preferred Date</th>
                          <th>Preferred Time</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mySentRequests.map(req => {
                          const tutorName = req.tutorId?.name || "Tutor";
                          return (
                            <tr key={req._id}>
                              <td style={{ fontWeight: "600" }}>{req.subject}</td>
                              <td>{tutorName}</td>
                              <td>{req.date}</td>
                              <td>{req.time}</td>
                              <td>
                                <span className={`status-badge ${req.status.toLowerCase()}`}>
                                  {req.status}
                                </span>
                              </td>
                              <td>
                                {req.status === "Pending" && (
                                  <button 
                                    className="dashboard-btn-danger"
                                    onClick={() => handleUpdateStatus(req._id, "Cancelled")}
                                  >
                                    Cancel
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
