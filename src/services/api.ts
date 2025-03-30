
import { toast } from "sonner";

const BASE_URL = 'https://reqres.in/api';

// Types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserUpdateData {
  first_name: string;
  last_name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

// API Functions
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    toast.error(message);
    throw error;
  }
};

export const getUsers = async (page: number = 1): Promise<UsersResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/users?page=${page}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    return await response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch users';
    toast.error(message);
    throw error;
  }
};

export const updateUser = async (id: number, userData: UserUpdateData): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    
    return await response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update user';
    toast.error(message);
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete user';
    toast.error(message);
    throw error;
  }
};
