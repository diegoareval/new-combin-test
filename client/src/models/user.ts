export interface JwtResponse {
  exp: number;
  user_id: string;
  auth_time: number;
}

export type LoginForm = {
  userName: string;
  password: string;
};

export type LoginResponse = {
  iat: number;
  exp: number;
  token: string;
};

export type ApiError = {
  error: string;
};

export interface UserAuth extends LoginResponse {
  userName: string;
}
