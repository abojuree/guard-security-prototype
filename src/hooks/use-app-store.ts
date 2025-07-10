import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  username: string;
  fullName: string;
  phone: string;
  email: string;
  userType: 'client' | 'guard' | 'admin';
  isActive: boolean;
}

interface Guard {
  id: number;
  userId: number;
  nationalId: string;
  experience: string;
  specializations: string[];
  rating: string;
  totalJobs: number;
  profileImage: string;
  isVerified: boolean;
  isAvailable: boolean;
}

interface AppState {
  // User state
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // Guard state
  currentGuard: Guard | null;
  
  // UI state
  isLoading: boolean;
  
  // Actions
  setCurrentUser: (user: User | null) => void;
  setCurrentGuard: (guard: Guard | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: null,
      isAuthenticated: false,
      currentGuard: null,
      isLoading: false,

      // Actions
      setCurrentUser: (user: User | null) => {
        set({
          currentUser: user,
          isAuthenticated: !!user,
        });
      },

      setCurrentGuard: (guard: Guard | null) => {
        set({
          currentGuard: guard,
        });
      },

      logout: () => {
        set({
          currentUser: null,
          currentGuard: null,
          isAuthenticated: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({
          isLoading: loading,
        });
      },
    }),
    {
      name: 'haris-app-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        currentGuard: state.currentGuard,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Computed selectors
export const useCurrentUserType = () => {
  const currentUser = useAppStore((state) => state.currentUser);
  return currentUser?.userType || null;
};

export const useIsClient = () => {
  const userType = useCurrentUserType();
  return userType === 'client';
};

export const useIsGuard = () => {
  const userType = useCurrentUserType();
  return userType === 'guard';
};

export const useIsAdmin = () => {
  const userType = useCurrentUserType();
  return userType === 'admin';
};

// Helper functions
export const getUserFullName = (user: User | null): string => {
  return user?.fullName || 'مستخدم';
};

export const getGuardRating = (guard: Guard | null): string => {
  return guard?.rating || '0.0';
};

export const getGuardTotalJobs = (guard: Guard | null): number => {
  return guard?.totalJobs || 0;
};

export const isGuardAvailable = (guard: Guard | null): boolean => {
  return guard?.isAvailable || false;
};

export const isGuardVerified = (guard: Guard | null): boolean => {
  return guard?.isVerified || false;
};
