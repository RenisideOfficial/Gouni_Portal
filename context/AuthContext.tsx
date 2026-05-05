// context/AuthContext.tsx
"use client";

import { api } from "@/lib/api/base";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface BaseUser {
  id: string;
  email: string;
  name: string;
  role: "student" | "staff" | "bursar";
}

export interface StudentUser extends BaseUser {
  role: "student";
  regNo?: string;
  level?: string;
  isStudent?: boolean;
  fullName?: string; // For compatibility
}

interface StaffUser extends BaseUser {
  role: "staff";
  staffRole: string;
  isSuspended?: boolean;
  createdBy?: string;
}

interface BursarUser extends BaseUser {
  role: "bursar";
  employeeId: string;
  isSuperAdmin: boolean;
  department?: string;
  phone?: string;
}

export type User = StudentUser | StaffUser | BursarUser;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userRole: "student" | "staff" | "bursar" | null;
  setUser: (user: User | null) => void;
  updateUser: (userData: Record<string, any>) => void;
  login: (
    email: string,
    password: string,
    role?: "student" | "staff" | "bursar",
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const userRole = user?.role || null;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await api.get("/api/auth/me");
      if (res.data.user) {
        const userData = res.data.user;
        const transformedUser = transformUserData(userData);
        setUser(transformedUser);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const transformUserData = (data: any): User => {
    const baseUser: BaseUser = {
      id: data.id,
      email: data.email,
      name: data.name || data.fullName,
      role: data.role,
    };

    switch (data.role) {
      case "student":
        return {
          ...baseUser,
          role: "student",
          regNo: data.reg_no || data.regNo,
          level: data.level,
          isStudent: data.is_student,
          fullName: data.name || data.fullName,
        } as StudentUser;

      case "staff":
        return {
          ...baseUser,
          role: "staff",
          staffRole: data.role || data.staffRole,
          isSuspended: data.is_suspended,
          createdBy: data.created_by,
        } as StaffUser;

      case "bursar":
        return {
          ...baseUser,
          role: "bursar",
          employeeId: data.employee_id || data.employeeId,
          isSuperAdmin: data.is_super_admin || data.isSuperAdmin,
          department: data.department,
          phone: data.phone,
        } as BursarUser;

      default:
        return baseUser as User;
    }
  };

  const updateUser = (userData: Record<string, any>) => {
    setUser((prev) => {
      if (!prev) return null;
      return transformUserData({ ...prev, ...userData });
    });
  };

  // Updated login function with role parameter
  const login = async (
    email: string,
    password: string,
    role?: "student" | "staff" | "bursar",
  ) => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { email, password, role });
      const transformedUser = transformUserData(res.data.user);
      setUser(transformedUser);
    } catch (err) {
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userRole,
        setUser,
        updateUser,
        login,
        logout,
        checkAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
