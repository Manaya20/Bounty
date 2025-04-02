import api from "./api";

// Login function
export async function login(email, password) {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token } = response.data; // Extract the token from the response
    localStorage.setItem("token", token); // Store the token in localStorage
    return response.data.user; // Return the user object for further use
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

// Signup function
export async function signup(userData) {
  try {
    const response = await api.post("/auth/signup", userData);
    return response.data; // Return the created profile
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
}

// Fetch authenticated user
export async function getMe() {
  try {
    const response = await api.get("/auth/me");
    return response.data.user; // Return the user object
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
}
