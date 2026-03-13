'use client';

// pages/dashboard.js
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [readings, setReadings] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);

  const calculations = [
    {
      title: "June 2025",
      field1: "aug01_25",
      field2: "jun01_25",
    },
    {
      title: "April 2025",
      field1: "jun01_25",
      field2: "apr01_25",
    },
    {
      title: "February 2025",
      field1: "apr01_25",
      field2: "feb01_25",
    },
    {
      title: "December 2024",
      field1: "feb01_25",
      field2: "dec01_24",
    },
    {
      title: "October 2024",
      field1: "dec01_24",
      field2: "oct01_24",
    },
  ];

  useEffect(() => {
    if (status === "authenticated") {
      const fetchDashboardData = async () => {
        setLoadingData(true);
        setError(null);
        try {
          const res = await fetch(
            `/api/dashboard?lastName=${session.user.lastName}`
          );
          const data = await res.json();

          if (res.ok && data.success && Array.isArray(data.data)) {
            // CRITICAL FIX: Filter out any entries that are missing a meter serial number.
            // This prevents the empty card from being rendered.
            const validReadings = data.data.filter(
              (reading) => reading.meter_serialNum
            );

            setReadings(validReadings);
          } else {
            setReadings([]);
            setError(data.message || "An error occurred while fetching data.");
          }
        } catch (err) {
          setError("Failed to fetch dashboard data.");
          setReadings([]);
        } finally {
          setLoadingData(false);
        }
      };
      fetchDashboardData();
    }
  }, [status, session]);

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen"></div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <br />
      <Card className="card dash-card w-full max-w-2xl shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="user-name text-5xl font-bold">
              {session.user.lastName}
            </CardTitle>
          </div>
          <Button
            className="sign-up"
            onClick={handleLogout}
            variant="destructive"
          >
            Log Out
          </Button>
          <CardDescription className="mt-2">Your Water Usage</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingData ? (
            <div className="flex justify-center items-center h-40"></div>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : readings.length === 0 ? (
            <p className="text-center text-gray-500">
              No readings found for your last name.
            </p>
          ) : (
            <div className="space-y-6">
              {readings.map((reading) => (
                <div
                  key={reading._id}
                  className="border text-3xl underline p-4 rounded-lg bg-gray-50"
                >
                  <h3 className="text-3xl underline font-semibold underline mb-2">
                    Meter # {reading.meter_serialNum}
                  </h3>
                  <ul className="space-y-2">
                    {calculations.map((calc, index) => {
                      const field1 = parseFloat(reading[calc.field1]);
                      const field2 = parseFloat(reading[calc.field2]);

                      let result = "Invalid data";
                      let amountDue = "Invalid data";

                      if (!isNaN(field1) && !isNaN(field2)) {
                        result = field1 - field2;
                      }

                      if (!isNaN(result) && result > 6000) {
                        amountDue = "$" + ((result - 6000) * 0.025).toFixed(2);
                      } else {
                        amountDue = "$" + "0.00";
                      }

                      return (
                        <li
                          key={index}
                          className="flex justify-between items-center bg-white p-2 rounded-md border"
                        >
                          <span className="usage-text font-medium">
                            {calc.title}:
                          </span>
                          <span className="used-text">{result} gal</span>
                          <span className="due-text">
                            <ul>
                              <li>Due {amountDue} </li>
                            </ul>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <br />
    </main>
  );
}
