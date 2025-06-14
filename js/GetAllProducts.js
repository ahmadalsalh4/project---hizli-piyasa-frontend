import { CalcDayDiffInDays } from "./util.js";

async function GetAllProducts(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data.rows;
}

async function GetAllProductsForUser(url) {
  const token = localStorage.getItem("authToken");
  if (token) {
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data;
  }
}

function MakeProductCard(product) {
  return `
            <div class="ad-card">
                <div class="ad-image">
                    <img src="${
                      product.image_path || "default-image.jpg"
                    }" alt="${product.title}">
                </div>
                <div class="ad-details">
                    <h3 class="ad-title">${product.title}</h3>
                    <div class="ad-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${product.city_name}
                    </div>
                    <div class="ad-price-container">
                        <div class="ad-price">${product.price} TL</div>
                        <div class="ad-date">${GetDateString(
                          product.date
                        )}</div>
                    </div>
                </div>
            </div>
        `;
}

function MakeProductCardforUser(product) {
  // Convert state_name to lowercase for consistent comparison
  const statusClass = `status-${product.state_name.toLowerCase()}`;

  return `
  <div class="ad-card" data-status="${product.state_name.toLowerCase()}">
    <div class="ad-image">
      <img src="${product.image_path || "default-image.jpg"}" alt="${
    product.title
  }">
      <div class="ad-status ${statusClass}">${product.state_name}</div>
      <div class="ad-actions">
        <div class="action-btn" title="Düzenle">
          <i class="fas fa-edit"></i>
        </div>
      </div>
    </div>
    <div class="ad-details">
      <h3 class="ad-title">${product.title}</h3>
      <div class="ad-location">
        <i class="fas fa-map-marker-alt"></i>
        ${product.city_name}
      </div>
      <div class="ad-price-container">
        <div class="ad-price">${product.price} TL</div>
        <div class="ad-date">${GetDateString(product.date)}</div>
      </div>
    </div>
  </div>
  `;
}

function GetDateString(date) {
  const DateDiff = CalcDayDiffInDays(date);
  if (DateDiff == 0) return "Bügün";
  else return DateDiff + " Gün önce";
}

export async function loadProductsTo(containerId, url) {
  const products = await GetAllProducts(url);
  const container = document.getElementById(containerId);
  container.innerHTML = products.map(MakeProductCard).join("");
}

export async function loadProductsToUser(containerId, url) {
  const products = await GetAllProductsForUser(url);
  if (products.rowCount === 0) return 0;
  const container = document.getElementById(containerId);
  container.innerHTML = products.rows.map(MakeProductCardforUser).join("");
  return products.rowCount;
}
