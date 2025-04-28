import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

// Function to check user subscription
async function checkUserSubscriptionClient(accessToken?: string, id?: string) {
  if (!accessToken || !id) {
    const cookies = useCookies();
    accessToken = cookies.get("accessToken");
    id = cookies.get("id");
  }

  if (!accessToken || !id) {
    console.error("Access token or user ID not found in cookies.");
    return null; // Handle the error as needed
  }

  try {
    const response = await fetch(`http://localhost:4000/users/${id}`, {
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
      // Subscription expired, check subscription status
      const response = await fetch(`http://localhost:4000/subscribtion/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        return true; // Subscription expired
      }

      const subscriptionData = await response.json();
      const endSubscriptionDate = new Date(subscriptionData.validateUntil);

      return endSubscriptionDate <= currentDate; // Return true if expired
    } else {
      return false; // Subscription still active
    }

  } catch (error) {
    console.error("Error fetching user subscription:", error);
    return null;
  }
}

// HOC to wrap components with subscription protection
export function withSubscriptionProtection<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>
) {
  return function ProtectedComponent(props: P) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [hasChecked, setHasChecked] = useState(false);
    const cookies = useCookies();
    const accessToken = cookies.get("accessToken");
    const id = cookies.get("id");

    useEffect(() => {
      const checkSubscription = async () => {
        const expired = await checkUserSubscriptionClient(accessToken, id);
        if (expired) {
          router.push("/#pricing");
        } else {
          setLoading(false);
        }
        setHasChecked(true);
      };

      if (typeof window !== "undefined") {
        checkSubscription();
      }
    }, [accessToken, id, router]);

    if (loading || !hasChecked) {
      return <div>Loading...</div>; // Show loading screen until the subscription check is done
    }

    // Return the wrapped component
    return <Component {...props} />;
  };
}
