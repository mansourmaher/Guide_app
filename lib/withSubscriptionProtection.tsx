"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

async function checkUserSubscriptionClient() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("id");

    if (!accessToken || !userId) {
      return true; // no user, consider expired
    }

    const response = await fetch(`http://localhost:4000/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    const endSubscriptionDate = new Date(data.subscriptionEndDate);
    const currentDate = new Date();

    if (endSubscriptionDate < currentDate) {
      // expired, check second subscription
      const subResponse = await fetch(
        `http://localhost:4000/subscribtion/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!subResponse.ok) {
        return true; // subscription expired
      }

      const subData = await subResponse.json();
      const subEndDate = new Date(subData.validateUntil);

      return subEndDate < currentDate; // true = expired
    }

    return false; // subscription active
  } catch (error) {
    console.error("Error checking subscription client:", error);
    return true; // safer to consider expired
  }
}

export function withSubscriptionProtection<P>(
  Component: React.ComponentType<P>
) {
  return function ProtectedComponent(props: P) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const check = async () => {
        const expired = await checkUserSubscriptionClient();
        if (expired) {
          router.push("/#pricing");
        } else {
          setLoading(false);
        }
      };

      check();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    // @ts-ignore
    return <Component {...props} />;
  };
}
