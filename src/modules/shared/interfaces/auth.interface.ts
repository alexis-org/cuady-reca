export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface Local {
  id: string;
  codigo: string;
  nombre: string;
  direccion?: string;
}

export interface FechaContable {
  id: string;
  fecha: string;
  localId: string;
  estado: 'abierta' | 'cerrada';
}
