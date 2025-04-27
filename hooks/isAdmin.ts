

const isAdmin = async (id:string,accessToken:string) => {
    try {
      const response = await fetch(`http://localhost:4000/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        return false; // User is not an admin or request failed
      }
      const data = await response.json();
      if(data.role === "ADMIN") {
        return true; // User is an admin
      }
        return false; // User is not an admin
    } catch (error) {
      console.error("Error fetching user data:", error);
      return false;
    }
  }
  export default isAdmin;