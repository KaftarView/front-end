import { jwtDecode } from "jwt-decode";

// Save the token to localStorage
export const setToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

// Get the token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem("access_token");
};

// Remove the token
export const removeToken = () => {
  localStorage.removeItem("access_token");
};

// Decode the JWT
export const decodeToken = (token: string) => {
  try {
    return jwtDecode(token); // Decodes the payload
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Check if the token is expired
export const isTokenExpired = (token: string): boolean => {
  const decoded: any = jwtDecode(token);
  return decoded.exp * 1000 < Date.now(); // Compare expiration time with current time
};
