// Based on API Documentation User Model
export interface User {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Registration request (POST /auth/signup)
export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
}

// Login request (POST /auth/login)
export interface LoginRequest {
  email: string;
  password: string;
}

// Login response
export interface LoginResponse {
  token: string;
  expiresIn: number;
}
