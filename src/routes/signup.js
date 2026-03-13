'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // Import signIn function
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Step 1: Call your custom signup API to create the user in the database
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, lastName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "An unknown error occurred.");
        setIsLoading(false);
        return;
      }

      // Step 2: If the API call was successful, use NextAuth.js's signIn function
      const signInResult = await signIn("credentials", {
        redirect: false, // Prevents a full page refresh
        email,
        password,
      });

      if (signInResult.error) {
        // Handle a sign-in error specifically
        setError(
          "Failed to sign in after account creation. Please try logging in manually."
        );
      } else {
        // Step 3: If sign-in is successful, redirect the user to the dashboard
        router.push("/dashboard");
      }
    } catch (err) {
      // Catch any network or other unexpected errors
      console.error(err);
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="card signup-card w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl space-x-6">Sign Up</CardTitle>
          <CardDescription>
            Create an account to view your water usage dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6 space-x-6">
              <label htmlFor="lastName">Last Name</label>
              <Input
                className="user-input"
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
              />
            </div>
            <div className="space-y-6 space-x-6">
              <label htmlFor="email">Email</label>
              <Input
                className="user-input"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="space-y-6 space-x-6">
              <label htmlFor="password">Password</label>
              <Input
                className="user-input"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Desired Password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className="sign-up w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
