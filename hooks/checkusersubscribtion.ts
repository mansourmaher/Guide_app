
const checkUserSubscription = async (id:string,accessToken:string) => {
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
};
export default checkUserSubscription;
