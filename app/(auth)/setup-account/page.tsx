"use client";
import React, { useEffect } from "react";
import { useCookies } from "next-client-cookies";

import GuideProfileSetup from "../_components/guide_account";
import { UserModelType } from "@/types";
import { withSubscriptionProtection } from "@/lib/withSubscriptionProtection";

function SetupAccount() {
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken");
  const id = cookies.get("id");
  const [user, setUser] = React.useState<UserModelType>({} as UserModelType);

  useEffect(() => {
    // if (!accessToken) {
    //   window.location.href = "/login";
    // }
    const fetchUser = async () => {
      const user = await fetch(`http://localhost:4000/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await user.json();
      setUser(data);
    };
    fetchUser();
  }, [id]);

  return <GuideProfileSetup user={user} />;
}

export default withSubscriptionProtection(SetupAccount);
