export interface LoginRequest {
  username: string;
  password: string;
}

export interface Permission {
  name: string;
  route: string;
  icon: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  roles: string[];
  permissions: Permission[];
}