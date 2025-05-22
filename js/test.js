test();

    async function test()
    {
      //await logout();

      //await login();

      await fetchProtectedData();
    }

async function login() {
  const response = await fetch('http://localhost:5000/authenticat/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'a12@example.com', password: '123321' }),
  });
  const data = await response.json();
  if (data.token) {
    localStorage.setItem('authToken', data.token);
    alert('Login successful! Token saved.');
  } else {
    alert('Login failed!');
  }
}

async function logout() {
    await localStorage.removeItem('authToken');
    alert('Logged out!');
}

async function fetchProtectedData() {
  const token = await localStorage.getItem('authToken');
console.log(token);
  if (!token) {
    alert('No token found. Login first!');
    return;
  }

  const response = await fetch('http://localhost:5000/me', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  if (!response.ok)
  {
    if (data.error === 'jwt expired') {
      alert("Session expired. Please relogin.");
      return;}
  }
  console.log(data);
}
//http://localhost:5000/ads?category=electronics&city=New+York&minPrice=100&maxPrice=1000
// &startDate=2023-01-01&search=laptop&sortBy=price&sortOrder=ASC
