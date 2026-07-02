import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token
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

// Auth endpoints
export const loginUser = async (email, password) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};

export const signupUser = async (name, email, password, college) => {
  const response = await API.post("/auth/signup", { name, email, password, college });
  return response.data;
};

export const getMyProfile = async () => {
  const response = await API.get("/auth/me");
  return response.data;
};

export const updateMyProfile = async (profileData) => {
  const response = await API.put("/auth/profile", profileData);
  return response.data;
};

// Skills endpoints
export const fetchSkills = async (category = "All", search = "") => {
  const params = {};
  if (category && category !== "All") params.category = category;
  if (search) params.search = search;
  
  const response = await API.get("/api/skills", { params });
  return response.data;
};

export const fetchSkillDetails = async (id) => {
  const response = await API.get(`/api/skills/${id}`);
  return response.data;
};

export const createSkillListing = async (skillData) => {
  const response = await API.post("/api/skills", skillData);
  return response.data;
};

export const submitSkillReview = async (skillId, reviewData) => {
  const response = await API.post(`/api/skills/${skillId}/reviews`, reviewData);
  return response.data;
};

// Bookings endpoints
export const requestSession = async (bookingData) => {
  const response = await API.post("/api/bookings", bookingData);
  return response.data;
};

export const fetchMySessions = async () => {
  const response = await API.get("/api/bookings/my-sessions");
  return response.data;
};

export const updateSessionStatus = async (bookingId, status) => {
  const response = await API.put(`/api/bookings/${bookingId}/status`, { status });
  return response.data;
};

export default API;
