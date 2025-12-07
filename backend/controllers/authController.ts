import { AdminUser } from '../models';

const USERS_STORAGE_KEY = 'hair_aura_admin_users';

const INITIAL_USERS: AdminUser[] = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'admin@hairaura.com',
    password: 'admin123', // Default password
    role: 'Super Admin',
    avatar: '',
    lastLogin: new Date().toISOString()
  }
];

export const AuthController = {
  getUsers: (): AdminUser[] => {
    if (typeof window === 'undefined') return INITIAL_USERS;
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : INITIAL_USERS;
  },

  getCurrentUser: (): AdminUser => {
    const users = AuthController.getUsers();
    return users[0]; // Simulating logged in user as the first one
  },

  updateCurrentUser: (updates: Partial<AdminUser>): AdminUser => {
    const users = AuthController.getUsers();
    const currentUserIndex = 0; // Simulation
    const updatedUser = { ...users[currentUserIndex], ...updates };
    users[currentUserIndex] = updatedUser;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return updatedUser;
  },

  addUser: (user: Omit<AdminUser, 'id' | 'lastLogin'>): AdminUser => {
    const users = AuthController.getUsers();
    const newUser: AdminUser = {
      ...user,
      id: Date.now().toString(),
      lastLogin: '-'
    };
    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    return newUser;
  },

  deleteUser: (id: string): void => {
    const users = AuthController.getUsers();
    // Prevent deleting the last super admin in a real app, simplified here
    if (users.length <= 1) return; 
    const filtered = users.filter(u => u.id !== id);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filtered));
  }
};