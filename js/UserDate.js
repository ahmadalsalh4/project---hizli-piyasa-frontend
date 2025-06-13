export async function GetUserDate() {
  const token = localStorage.getItem("authToken");
  if (token) {
    const response = await fetch("http://localhost:5000/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      localStorage.removeItem("authToken");
      return false;
    }
  } else return false;
}
