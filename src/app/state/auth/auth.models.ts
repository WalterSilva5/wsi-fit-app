export interface UserModel {
  createdAt: string;
  deletedAt: string | null;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  role: string;
  updatedAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    createdAt: string;
    deletedAt: string | null;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    role: string;
    updatedAt: string;
  } | null;
  error: string | null;
}

let savedAuth: string | null = null;
if (typeof window !== 'undefined') {
  savedAuth = window.localStorage.getItem('auth');
}

export const initialAuthState: AuthState = savedAuth
  ? {
      ...JSON.parse(savedAuth),
      isAuthenticated: true,
      error: null,
    }
  : {
      isAuthenticated: false,
      accessToken: '',
      refreshToken: '',
      user: null,
      error: null,
    };
