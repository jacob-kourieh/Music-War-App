export interface SignUpRequest {
  username: string;
  password: string;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface ErrorResponse {
  response: {
    status: number;
    data: { message: string };
  };
}
