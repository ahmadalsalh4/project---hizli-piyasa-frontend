/*
<i class="fa-solid fa-money-bill-trend-up"></i>

@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css');

<link rel="stylesheet" href="../css/404.css"></link>

<a href="/" class="logo">MyWebsite</a>

ara wp

                    <div class="product-card">
                        <div class="product-image">
                            <img src="https://via.placeholder.com/300x300?text=AirPods+Pro" alt="AirPods Pro">
                        </div>
                        <div class="product-details">
                            <h3 class="product-title">Apple AirPods Pro 2.Nesil</h3>
                            <div class="product-price">5.299 TL</div>
                            <div class="product-meta">
                                <div class="product-card-location">
                                    <i class="fas fa-map-marker-alt"></i>
                                        İstanbul
                                </div>
                                <span>3 gün önce</span>
                            </div>
                        </div>
                    </div>


//http://localhost:5000/ads?category=electronics&city=New+York&minPrice=100&maxPrice=1000
// &startDate=2023-01-01&search=laptop&sortBy=price&sortOrder=ASC



<div id="ads-grid" class="ads-grid"></div>

<script type="module">
        import { loadProductsTo } from './GetAllProducts.js';
        document.addEventListener('DOMContentLoaded', () => {
        loadProductsTo('ads-grid');});
    </script>

    <script type="module">
        import {LoadBanner} from '../js/util.js'
        document.addEventListener('DOMContentLoaded', () =>{
            LoadBanner();});
    </script>



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

*/