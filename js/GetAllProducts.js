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
  const price = Number(product.price);
  return `
    <div class="ad-card" data-ad-id="${product.id}">
        <div class="ad-image">
          <img src="${product.image_path || "default-image.jpg"}" alt="${
    product.title
  }">
        </div>
        <div class="ad-details">
          <h3 class="ad-title">${product.title}</h3>
          <div class="ad-location">
            <i class="fas fa-map-marker-alt"></i>
            ${product.city_name}
          </div>
          <div class="ad-price-container">
            <div class="ad-price">${price.toLocaleString("de-DE")} TL</div>
            <div class="ad-date">${GetDateString(product.date)}</div>
          </div>
        </div>
    </div>
  `;
}

function MakeProductCardforUser(product) {
  const price = Number(product.price);
  // Convert state_name to lowercase and remove any whitespace
  const state = product.state_name.toLowerCase().trim();
  const statusClass = `status-${state}`;

  // Map state names to Turkish display values
  let displayState = product.state_name;
  if (state === "active") displayState = "Aktif";
  else if (state === "pending") displayState = "Bekliyor";
  else if (state === "sold") displayState = "Satıldı";

  return `
    <div class="ad-card" data-ad-id="${product.id}" data-status="${state}">
        <div class="ad-image">
          <img src="${product.image_path || "default-image.jpg"}" alt="${
    product.title
  }">
          <div class="ad-status ${statusClass}">${displayState}</div>
        </div>
        <div class="ad-details">
          <h3 class="ad-title">${product.title}</h3>
          <div class="ad-location">
            <i class="fas fa-map-marker-alt"></i>
            ${product.city_name}
          </div>
          <div class="ad-price-container">
            <div class="ad-price">${price.toLocaleString("de-DE")} TL</div>
            <div class="ad-date">${GetDateString(product.date)}</div>
          </div>
        </div>
      <div class="ad-actions">
        <div class="action-btn edit-btn" title="Düzenle" data-ad-id="${
          product.id
        }">
          <i class="fas fa-edit"></i>
        </div>
        <div class="action-btn delete-btn" title="Sil" data-ad-id="${
          product.id
        }">
          <i class="fas fa-trash"></i>
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
