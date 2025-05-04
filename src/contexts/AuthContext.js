"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
const API_BASE_URL = "http://localhost:8080";

const ROLES = {
  CUSTOMER: "CUSTOMER",
  EMPLOYEE: "EMPLOYEE",
  ADMIN: "ADMIN",
};

const ROLE_REDIRECTS = {
  [ROLES.CUSTOMER]: "/",
  [ROLES.ADMIN]: "/admin/manage-drinks",
  [ROLES.EMPLOYEE]: "/employee/profile",
};

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  isLoading: true,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "LOGOUT":
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          // Validate token with backend
          const validationResponse = await fetch(
            `${API_BASE_URL}/api/auth/validate`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );

          if (validationResponse.ok) {
            const { valid, role } = await validationResponse.json();
            if (valid) {
              const user = { role }; // Add other user data if needed

              dispatch({
                type: "SET_AUTH",
                payload: {
                  user,
                  token: storedToken,
                },
              });
            } else {
              localStorage.removeItem("token");
            }
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initAuth();
  }, []);

  const handleRoleBasedRedirect = (role) => {
    const redirectPath = ROLE_REDIRECTS[role] || "/";
    router.push(redirectPath);
  };

  async function login(email, password) {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Login failed");
      }

      const { token, message } = await response.json();
      const { roles } = jwtDecode(token);

      const role = roles[0].authority;
      localStorage.setItem("token", token);

      dispatch({
        type: "SET_AUTH",
        payload: {
          user: { role },
          token,
        },
      });

      handleRoleBasedRedirect(role);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function register({ email, password, firstName, lastName }) {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        const error = await response.text();
        throw new Error(error || "Registration failed");
      }

      alert(result.message || "Registration successful! Please login.");
      router.push("/login");
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function registerEmployee({
    email,
    password,
    firstName,
    lastName,
    gender,
    address,
    phone,
    dateOfBirth,
  }) {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await fetch(`${API_BASE_URL}/api/auth/register/employee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          gender,
          address,
          phone,
          dateOfBirth,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        const error = await response.text();
        throw new Error(error || "Registration failed");
      }

      alert(result.message || "Employee registration successful! Please login.");
      router.push("/login");
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }


  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  }

  function checkPermission(requiredRoles) {
    if (!state.user) return false;
    return requiredRoles.includes(state.user.role);
  }

  // Add token to all authenticated requests
  function authFetch(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
      credentials: "include",
    });
  }

  const value = {
    ...state,
    login,
    logout,
    register,
    registerEmployee,
    checkPermission,
    authFetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
