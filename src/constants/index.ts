// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  LOCALES: {
    GET_ALL: '/locales',
  },
  FECHAS_CONTABLES: {
    GET_BY_LOCAL: '/fechas-contables',
    CREATE: '/fechas-contables',
  },
  MONEDAS: {
    GET_ALL: '/monedas',
    CREATE: '/monedas',
    UPDATE: '/monedas',
    DELETE: '/monedas',
  },
  BANCOS: {
    GET_ALL: '/bancos',
    CREATE: '/bancos',
    UPDATE: '/bancos',
    DELETE: '/bancos',
  },
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  CAJERO: 'cajero',
  SUPERVISOR: 'supervisor',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  SELECTED_LOCAL: 'selected_local',
  SELECTED_FECHA: 'selected_fecha',
} as const;
