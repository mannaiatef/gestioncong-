export interface User {
  id?: number;
  username: string;
  password: string;
  role?: string;
  email?: string; // Rendre email optionnel avec ?
  is_active?: boolean;
   chef?: User; //zedtou ena 
}

export interface UserProfile {
  id?: number;
  username: string;
  email?: string;
  role?: string;
  is_active?: boolean;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string; // URL de l'avatar
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
}