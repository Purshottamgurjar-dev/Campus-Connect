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
  if (!localStorage.getItem("mock_user_v3")) {
    const defaultUser = {
      id: "mock_user_alex",
      name: "Alex Rivers",
      email: "alex@stanford.edu",
      college: "Stanford University",
      city: "Stanford",
      bio: "CS senior with a passion for web technologies and peer mentorship.",
      skillsToTeach: ["Python", "Algorithms", "Git Version Control"],
      skillsToLearn: ["UI Design", "Figma Prototyping"]
    };
    localStorage.setItem("mock_user_v3", JSON.stringify(defaultUser));
  }

  if (!localStorage.getItem("mock_skills_v3")) {
    const initialSkills = [
      {
        _id: "skill_alex_1",
        userId: "mock_user_alex",
        name: "Alex Rivers",
        school: "Stanford University",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        tutorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
        category: "Math",
        categoryClass: "math",
        title: "Advanced Calculus",
        description: "Assisting with multivariate calculus, differential equations, and series convergence tests.",
        availability: "Mon-Wed Evenings",
        engagement: "12 Requests Received",
        status: "Active",
        createdAt: "2024-01-12T12:00:00.000Z",
        rating: 4.9,
        reviews: 12,
        reviewsList: []
      },
      {
        _id: "skill_alex_2",
        userId: "mock_user_alex",
        name: "Alex Rivers",
        school: "Stanford University",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        tutorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
        category: "Design",
        categoryClass: "design",
        title: "UI Design Fundamentals",
        description: "Introduction to Figma, typography scales, and grid systems for digital products.",
        availability: "Flexible",
        engagement: "8 Requests Received",
        status: "Active",
        createdAt: "2024-02-05T12:00:00.000Z",
        rating: 4.8,
        reviews: 8,
        reviewsList: []
      },
      {
        _id: "skill_alex_3",
        userId: "mock_user_alex",
        name: "Alex Rivers",
        school: "Stanford University",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        tutorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
        category: "Physics",
        categoryClass: "physics",
        title: "Quantum Mechanics I",
        description: "Basic wave functions, Schrodinger equation, and particle in a box theory.",
        availability: "Not set",
        engagement: "0 Requests",
        status: "Draft",
        createdAt: "2024-03-01T12:00:00.000Z",
        rating: 5.0,
        reviews: 0,
        reviewsList: []
      }
    ];
    localStorage.setItem("mock_skills_v3", JSON.stringify(initialSkills));
  }

  if (!localStorage.getItem("mock_bookings_v3")) {
    const defaultBookings = [
      {
        _id: "req_1",
        skillId: "skill_react",
        studentId: "mock_user_alex",
        tutorId: { _id: "tutor_alex", name: "Alex Rivers", school: "Stanford University" },
        subject: "React.js Basics",
        date: "Oct 28, 2024",
        time: "4:00 PM",
        message: "Hey Alex, I'd love to learn more about hooks and how to handle complex state in a large-scale React application...",
        status: "Accepted"
      },
      {
        _id: "req_2",
        skillId: "skill_alex_1",
        studentId: "mock_user_alex",
        tutorId: { _id: "tutor_sarah", name: "Sarah Chen", school: "UC Berkeley" },
        subject: "Advanced Calculus",
        date: "Nov 02, 2024",
        time: "2:30 PM",
        message: "Struggling with multi-variable integration and Green's Theorem. Looking for a step-by-step walkthrough...",
        status: "Pending"
      },
      {
        _id: "req_3",
        skillId: "skill_alex_2",
        studentId: "mock_user_alex",
        tutorId: { _id: "tutor_jordan", name: "Jordan Smith", school: "UT Austin" },
        subject: "UI Design Fundamentals",
        date: "Oct 20, 2024",
        time: "11:00 AM",
        message: "Would love to go over dashboard layout grids and styling typography hierarchies.",
        status: "Completed"
      },
      {
        _id: "req_4",
        skillId: "skill_spanish",
        studentId: "mock_user_alex",
        tutorId: { _id: "tutor_elena", name: "Elena Rodriguez", school: "NYU" },
        subject: "Conversational Spanish",
        date: "Oct 15, 2024",
        time: "1:00 PM",
        message: "Practice Spanish conversation for my study abroad interview next month.",
        status: "Declined",
        tutorNote: "Sorry, I won't be available during that time due to midterms. Let me know if you can reschedule for next week!"
      }
    ];
    localStorage.setItem("mock_bookings_v3", JSON.stringify(defaultBookings));
  }
};

if (USE_MOCK) {
  initMockDB();
}

// Helper fetchers
const getMockUser = () => JSON.parse(localStorage.getItem("mock_user_v3"));
const saveMockUser = (user) => localStorage.setItem("mock_user_v3", JSON.stringify(user));
const getMockSkills = () => JSON.parse(localStorage.getItem("mock_skills_v3"));
const saveMockSkills = (skills) => localStorage.setItem("mock_skills_v3", JSON.stringify(skills));
const getMockBookings = () => JSON.parse(localStorage.getItem("mock_bookings_v3"));
const saveMockBookings = (bookings) => localStorage.setItem("mock_bookings_v3", JSON.stringify(bookings));


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
