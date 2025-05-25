// Check JWT on page load
document.addEventListener('DOMContentLoaded', async () => {
  const profileButton = document.getElementById('profileButton');
  const loginButton = document.getElementById('loginButton');
  const profileImg = document.getElementById('profileImg');

  // Retrieve JWT from localStorage (or cookies)
  const token = localStorage.getItem('authToken');

  if (token) {
    try {
      // Validate token with your API
      const response = await fetch('http://localhost:5000/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        // Show profile button and image
        profileButton.style.display = 'inline-block';
        profileImg.src = userData.profile_image_path || 'default-avatar.jpg';
        loginButton.style.display = 'none';

        // Optional: Store user data for later use
        localStorage.setItem('userData', JSON.stringify(userData));
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      // Token is invalid/expired
      console.error('Token validation failed:', error);
      clearAuthData();
      showLoginButton();
    }
  } else {
    // No token found
    showLoginButton();
  }
});

// Helper functions
function showLoginButton() {
  document.getElementById('loginButton').style.display = 'inline-block';
  document.getElementById('profileButton').style.display = 'none';
  document.getElementById('profileImg').style.display = 'none';
}

function clearAuthData() {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userData');
}

// Login button click handler
document.getElementById('loginButton').addEventListener('click', () => {
  window.location.href = '../pages/login.html';
});

// Profile button click handler
document.getElementById('profileButton').addEventListener('click', () => {
  window.location.href = 'profile.html';
});