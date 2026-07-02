import axios from "axios";
import { skillsData } from "../data/skillsData";

// Toggle true to run client purely in-memory (no backend/MongoDB needed)
const USE_MOCK = true;

const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- IN-MEMORY MOCK DATABASE SETUP (LocalStorage backed) ---
const initMockDB = () => {
  if (!localStorage.getItem("mock_user")) {
    const defaultUser = {
      id: "mock_user_purshottam",
      name: "Purshottam",
      email: "purshottam@college.edu",
      college: "Stanford University",
      city: "Stanford",
      bio: "CS student passionate about UI design and programming.",
      skillsToTeach: ["UI Design", "Figma"],
      skillsToLearn: ["Python", "Algorithms"]
    };
    localStorage.setItem("mock_user", JSON.stringify(defaultUser));
  }

  if (!localStorage.getItem("mock_skills")) {
    // Add _id field to match DB style
    const initialSkills = skillsData.map(s => ({
      ...s,
      _id: s.id.toString(),
      userId: s.id.toString() // simulated owner id
    }));
    localStorage.setItem("mock_skills", JSON.stringify(initialSkills));
  }

  if (!localStorage.getItem("mock_bookings")) {
    const defaultBookings = [
      {
        _id: "booking_1",
        skillId: "3", // Advanced Calculus Prep
        tutorId: { _id: "3", name: "Jordan Smith" },
        studentId: { _id: "mock_user_purshottam", name: "Purshottam" },
        subject: "Advanced Calculus Prep",
        date: "2026-07-15",
        time: "Afternoon (12:00 PM - 4:00 PM)",
        message: "Need help preparing for the upcoming midterms.",
        status: "Confirmed"
      },
      {
        _id: "booking_2",
        skillId: "1", // Python for Beginners
        tutorId: { _id: "1", name: "Alex Rivera" },
        studentId: { _id: "mock_user_purshottam", name: "Purshottam" },
        subject: "Python for Beginners",
        date: "2026-07-22",
        time: "Morning (8:00 AM - 12:00 PM)",
        message: "Looking forward to learning variables and functions.",
        status: "Pending"
      }
    ];
    localStorage.setItem("mock_bookings", JSON.stringify(defaultBookings));
  }
};

if (USE_MOCK) {
  initMockDB();
}

// Helper fetchers
const getMockUser = () => JSON.parse(localStorage.getItem("mock_user"));
const saveMockUser = (user) => localStorage.setItem("mock_user", JSON.stringify(user));
const getMockSkills = () => JSON.parse(localStorage.getItem("mock_skills"));
const saveMockSkills = (skills) => localStorage.setItem("mock_skills", JSON.stringify(skills));
const getMockBookings = () => JSON.parse(localStorage.getItem("mock_bookings"));
const saveMockBookings = (bookings) => localStorage.setItem("mock_bookings", JSON.stringify(bookings));


// --- API EXPORTS (Switches automatically based on USE_MOCK) ---

// Auth endpoints
export const loginUser = async (email, password) => {
  if (USE_MOCK) {
    const user = getMockUser();
    // Simulate correct login
    const token = "mock_jwt_token_for_user";
    localStorage.setItem("token", token);
    return { token, user };
  }
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};

export const signupUser = async (name, email, password, college) => {
  if (USE_MOCK) {
    const user = {
      id: "mock_user_purshottam",
      name,
      email,
      college: college || "My College",
      city: "",
      bio: "",
      skillsToTeach: [],
      skillsToLearn: []
    };
    saveMockUser(user);
    const token = "mock_jwt_token_for_user";
    localStorage.setItem("token", token);
    return { token, user };
  }
  const response = await API.post("/auth/signup", { name, email, password, college });
  return response.data;
};

export const getMyProfile = async () => {
  if (USE_MOCK) {
    // Return mock user profile
    return getMockUser();
  }
  const response = await API.get("/auth/me");
  return response.data;
};

export const updateMyProfile = async (profileData) => {
  if (USE_MOCK) {
    const user = getMockUser();
    const updated = { ...user, ...profileData };
    saveMockUser(updated);
    return updated;
  }
  const response = await API.put("/auth/profile", profileData);
  return response.data;
};

// Skills endpoints
export const fetchSkills = async (category = "All", search = "") => {
  if (USE_MOCK) {
    let list = getMockSkills();
    if (category && category !== "All") {
      list = list.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      list = list.filter(s => 
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return list;
  }
  const params = {};
  if (category && category !== "All") params.category = category;
  if (search) params.search = search;
  
  const response = await API.get("/api/skills", { params });
  return response.data;
};

export const fetchSkillDetails = async (id) => {
  if (USE_MOCK) {
    const list = getMockSkills();
    return list.find(s => s._id === id || s.id.toString() === id.toString());
  }
  const response = await API.get(`/api/skills/${id}`);
  return response.data;
};

export const createSkillListing = async (skillData) => {
  if (USE_MOCK) {
    const list = getMockSkills();
    const user = getMockUser();
    const newSkill = {
      _id: (list.length + 1).toString(),
      id: list.length + 1,
      userId: user.id,
      name: user.name,
      school: user.college || "Stanford University",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
      tutorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300",
      category: skillData.category,
      categoryClass: skillData.category.toLowerCase().replace(" ", ""),
      title: skillData.title,
      description: skillData.description,
      availability: skillData.availability || "Flexible Schedule",
      rating: 5.0,
      reviews: 0,
      tutorBio: skillData.tutorBio || user.bio,
      tutorTeaches: skillData.tutorTeaches || [skillData.category],
      reviewsList: []
    };
    const updated = [newSkill, ...list];
    saveMockSkills(updated);
    return newSkill;
  }
  const response = await API.post("/api/skills", skillData);
  return response.data;
};

export const submitSkillReview = async (skillId, reviewData) => {
  if (USE_MOCK) {
    const list = getMockSkills();
    const user = getMockUser();
    const skillIndex = list.findIndex(s => s._id === skillId.toString() || s.id.toString() === skillId.toString());
    
    if (skillIndex > -1) {
      const skill = list[skillIndex];
      const nameParts = user.name.split(" ");
      const initials = nameParts.map(p => p[0]).join("").toUpperCase().slice(0, 2);
      
      const newReview = {
        id: (skill.reviewsList.length + 1) * 100,
        initials,
        avatarClass: "blue-avatar",
        name: user.name,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        rating: Number(reviewData.rating),
        comment: reviewData.comment
      };
      
      skill.reviewsList = [newReview, ...skill.reviewsList];
      skill.reviews = skill.reviewsList.length;
      
      const sum = skill.reviewsList.reduce((acc, curr) => acc + curr.rating, 0);
      skill.rating = Number((sum / skill.reviewsList.length).toFixed(1));
      
      list[skillIndex] = skill;
      saveMockSkills(list);
      return skill;
    }
    throw new Error("Skill not found");
  }
  const response = await API.post(`/api/skills/${skillId}/reviews`, reviewData);
  return response.data;
};

// Bookings endpoints
export const requestSession = async (bookingData) => {
  if (USE_MOCK) {
    const bookings = getMockBookings();
    const skills = getMockSkills();
    const user = getMockUser();
    
    const skill = skills.find(s => s._id === bookingData.skillId.toString() || s.id.toString() === bookingData.skillId.toString());
    if (!skill) throw new Error("Skill listing not found");

    const newBooking = {
      _id: "booking_" + (bookings.length + 1),
      skillId: bookingData.skillId.toString(),
      tutorId: { _id: skill.userId, name: skill.name },
      studentId: { _id: user.id, name: user.name },
      subject: skill.title,
      date: bookingData.date,
      time: bookingData.time,
      message: bookingData.message || "",
      status: "Pending"
    };

    const updated = [newBooking, ...bookings];
    saveMockBookings(updated);
    return newBooking;
  }
  const response = await API.post("/api/bookings", bookingData);
  return response.data;
};

export const fetchMySessions = async () => {
  if (USE_MOCK) {
    return getMockBookings();
  }
  const response = await API.get("/api/bookings/my-sessions");
  return response.data;
};

export const updateSessionStatus = async (bookingId, status) => {
  if (USE_MOCK) {
    const bookings = getMockBookings();
    const idx = bookings.findIndex(b => b._id === bookingId);
    if (idx > -1) {
      bookings[idx].status = status;
      saveMockBookings(bookings);
      return bookings[idx];
    }
    throw new Error("Booking not found");
  }
  const response = await API.put(`/api/bookings/${bookingId}/status`, { status });
  return response.data;
};

export default API;
