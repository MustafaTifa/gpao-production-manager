export interface UserResponse {
  id: number;
  username: string;
  roles: { id: number; name: string }[];
}

export interface UserRequest {
  username: string;
  password?: string;
  roles: { id: number; name: string }[];
}
