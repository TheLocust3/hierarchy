import User from '../user/user';

export interface UserResponse {
  user: User;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface UserSuccessResponse {
  success: string;
}
