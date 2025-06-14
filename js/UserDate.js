export async function GetUserDate() {
  const token = localStorage.getItem("authToken");
  if (token) {
    const response = await fetch("http://localhost:5000/api/me", {
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

export async function UpdateUserdata() {
  // This data could come from an API call or other source
  const profileData = await GetUserDate();
  // Update the DOM elements
  document.getElementById("profileImage").src = profileData.profile_image_path;
  document.getElementById("profileName").textContent =
    profileData.name + " " + profileData.surname;
  document.getElementById("profileEmail").textContent = profileData.email;
  document.getElementById("profilePhone").textContent =
    profileData.phone_number;
}
