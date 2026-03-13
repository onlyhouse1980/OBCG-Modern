'use client';

// pages/forgot-password.js

import { useState } from "react";
import { BiEnvelope } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setIsError(false);
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

  return (
    <>
      <Card className="card">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>

        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm transform transition duration-500 hover:scale-105">
            {" "}
            <BiEnvelope className="text-indigo-600 text-5xl sm:text-6xl mb-2" />
            <h1>Forgot Password</h1>
          </div>
          <div>
            <p className="text-sm text-gray-600 text-center mb-6">
              Enter your email to receive a password reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={"my-button"}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>
          <CardFooter>
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
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
