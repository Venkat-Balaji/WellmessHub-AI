import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Show a smooth loading state while we check the user's auth status
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">
            Verifying session...
          </p>
        </div>
      </div>
    );
  }

  // If user is not logged in after loading, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Otherwise, render the protected route
  return <>{children}</>;
};

export default PrivateRoute;
