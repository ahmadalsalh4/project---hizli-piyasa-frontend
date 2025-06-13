import { GetUserDate } from "./UserDate.js";
export async function UpdateProfileState() {
  const loggedOutButtons = document.getElementById("loggedOutButtons");
  const loggedInMenu = document.getElementById("loggedInMenu");
  const userName = document.getElementById("userName");
  const profileImg = document.getElementById("profileImg");
  const Data = await GetUserDate();
  if (Data) {
    loggedOutButtons.style.display = "none";
    loggedInMenu.style.display = "flex";
    userName.textContent = Data.name + " " + Data.surname;
    if (Data.profile_image_path) {
      profileImg.style.backgroundImage = `url(${Data.profile_image_path})`;
      profileImg.style.backgroundSize = "cover";
    }
  }
}
