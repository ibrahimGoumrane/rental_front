import {
  User,
  SignupRequest,
  LoginRequest,
  LoginResponse,
  ApiResponse,
} from "../../../types";
import { api } from "../../config";

class UserService {
  private readonly basePath = "/auth";

  // POST /auth/signup
  async signup(data: SignupRequest): Promise<ApiResponse<LoginResponse>> {
    return api.post<ApiResponse<LoginResponse>>(
      `${this.basePath}/signup`,
      data,
      {
        addAuthHeaders: false,
      }
    );
  }

  // POST /auth/login
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return api.post<ApiResponse<LoginResponse>>(
      `${this.basePath}/login`,
      data,
      {
        addAuthHeaders: false,
      }
    );
  }

  // GET /auth/me
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return api.getItem<ApiResponse<User>>(`${this.basePath}/me`);
  }

  // GET /auth/
  async getAllUsers(): Promise<ApiResponse<User[]>> {
    return api.getItem<ApiResponse<User[]>>(`${this.basePath}/`);
  }
}

export const userService = new UserService();
