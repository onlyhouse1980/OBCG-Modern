'use client';

// pages/reset-password.js

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BiLockOpen } from "react-icons/bi";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Clear message when the component mounts or token changes.
    setMessage("");
    setIsError(false);
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setIsError(false);
        // Optional: Redirect to login page after a delay
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setMessage(result.message || "An unexpected error occurred.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Front-end fetch error:", error);
      setMessage("Network error. Please try again later.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-center p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm bg-white">
          <p className="text-red-700">Invalid or missing reset token.</p>
          <button
            onClick={() => router.push("/forgot-password")}
            className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Request a new password reset link.
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm transform transition duration-500 hover:scale-105">
          <div className="flex flex-col items-center mb-6">
            <BiLockOpen className="text-indigo-600 text-5xl sm:text-6xl mb-2" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Reset Password
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-150 ease-in-out ${
                isLoading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {message && (
            <div
              className={`mt-6 p-4 rounded-md text-sm text-center ${
                isError
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
