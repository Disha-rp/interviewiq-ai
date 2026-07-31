import api from "./api";

// Login
export const login = async (credentials) => {
  const response = await api.post("/auth/login/", credentials);
  return response.data;
};

// Register
export const register = async (userData) => {
  const response = await api.post("/auth/register/", userData);
  return response.data;
};

// Get Logged-in User Profile
export const getProfile = async () => {
  const response = await api.get("/auth/profile/");
  return response.data;
};