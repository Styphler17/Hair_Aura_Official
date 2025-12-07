import { AdminUser } from '../models';

const USERS_STORAGE_KEY = 'hair_aura_admin_users';
const CURRENT_USER_KEY = 'hair_aura_current_user';

const INITIAL_USERS: AdminUser[] = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'admin@hairaura.com',
    password: 'admin123',
    role: 'Super Admin',
    avatar: '',
    lastLogin: new Date().toISOString()
  }
];

export const AuthController = {
  getUsers: async (): Promise<AdminUser[]> => {
    try {
      const response = await fetch('https://hair-aura.debesties.com/api/get_admin_users.php');
      const data = await response.json();
      
      // Convert lastLogin to string format for consistency
      const users = data.map((user: any) => ({
        ...user,
        lastLogin: user.last_login || '-'
      }));
      
      return users;
    } catch (error) {
      console.error("Error fetching admin users:", error);
      // Fallback to localStorage
      if (typeof window === 'undefined') return INITIAL_USERS;
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_USERS;
    }
  },

  getCurrentUser: (): AdminUser => {
    if (typeof window === 'undefined') return INITIAL_USERS[0];
    
    // Get from localStorage (set during login)
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Fallback to first user
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    if (users) {
      const parsed = JSON.parse(users);
      return parsed[0] || INITIAL_USERS[0];
    }
    
    return INITIAL_USERS[0];
  },

  setCurrentUser: (user: AdminUser): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  },

  updateCurrentUser: async (updates: Partial<AdminUser>): Promise<AdminUser> => {
    const currentUser = AuthController.getCurrentUser();
    const updatedUser = { ...currentUser, ...updates };
    
    try {
      const response = await fetch('https://hair-aura.debesties.com/api/save_admin_user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update',
          id: currentUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          password: updates.password, // Only send if updating password
          avatar: updatedUser.avatar,
          role: updatedUser.role
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const result = await response.json();
      if (result.success) {
        // Update current user in localStorage
        AuthController.setCurrentUser(updatedUser);
        return updatedUser;
      } else {
        throw new Error(result.error || 'Failed to update user');
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Fallback to localStorage
      AuthController.setCurrentUser(updatedUser);
      return updatedUser;
    }
  },

  addUser: async (user: Omit<AdminUser, 'id' | 'lastLogin'>): Promise<AdminUser> => {
    try {
      const response = await fetch('https://hair-aura.debesties.com/api/save_admin_user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
          avatar: user.avatar || ''
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user');
      }

      const result = await response.json();
      if (result.success) {
        const newUser: AdminUser = {
          ...user,
          id: result.id,
          lastLogin: '-'
        };
        return newUser;
      } else {
        throw new Error(result.error || 'Failed to create user');
      }
    } catch (error) {
      console.error("Error creating user:", error);
      // Fallback to localStorage
      const users = await AuthController.getUsers();
      const newUser: AdminUser = {
        ...user,
        id: Date.now().toString(),
        lastLogin: '-'
      };
      const updatedUsers = [...users, newUser];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      return newUser;
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      const response = await fetch('https://hair-aura.debesties.com/api/delete_admin_user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      // Fallback to localStorage
      const users = await AuthController.getUsers();
      if (users.length <= 1) {
        throw new Error('Cannot delete the last admin user');
      }
      const filtered = users.filter(u => u.id !== id);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filtered));
    }
  }
};
