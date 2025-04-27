"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

async function checkUserSubscriptionClient(accessToken?: string, id?: string) {
    if(!accessToken || !id) {
        const cookies = useCookies();
        accessToken = cookies.get("accessToken");
        id = cookies.get("id");
    }
    if (!accessToken || !id) {
      console.error("Access token or user ID not found in cookies.");
      return null; // or handle the error as needed
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
        const endsubscribtionData=data.subscriptionEndDate
        const currentDate = new Date();
        const endSubscriptionDate = new Date(endsubscribtionData);
        const isExpired = endSubscriptionDate < currentDate;
        console.log(endSubscriptionDate);
        console.log(currentDate);
        if (isExpired) {
          const response=await fetch(`http://localhost:4000/subscribtion/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (!response.ok) {
            
            return true;
          }
          const data = await response.json();
          console.log("data",data);
          const currentDate = new Date();
          const endSubscriptionDate = new Date(data.validateUntil);
    
          if(endSubscriptionDate > currentDate) {
            console.log("Subscription is active");
            return false; 
          }
    
          console.log("Subscription has expired");
          return true; // Subscription is expired
        } else {
          console.log("Subscription is active");
          return false; // Subscription is active
        }
        
      } catch (error) {
        console.error("Error fetching user subscription:", error);
        return null;
      }
}

export function withSubscriptionProtection<P>(
  Component: React.ComponentType<P>
) {
  return function ProtectedComponent(props: P) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const cookies = useCookies();
    const accessToken = cookies.get("accessToken");
    const id = cookies.get("id");

    useEffect(() => {
      const check = async () => {
        const expired = await checkUserSubscriptionClient(accessToken, id);
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
