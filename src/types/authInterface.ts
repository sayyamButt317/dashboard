export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
}

