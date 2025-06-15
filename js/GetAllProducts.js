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

export async function loadProductsToSeller(containerId, url) {
  const res = await fetch(url);
  if (!res.ok) return -1;
  const data = await res.json();
  const container = document.getElementById(containerId);
  container.innerHTML = data.rows.map(MakeProductCard).join("");
  return { userdata: data.userdata, rowCount: data.rowCount };
}

function setupDeleteButtons(container) {
  container.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const adId = btn.dataset.adId;

      if (confirm("Bu ilanı silmek istediğinize emin misiniz?")) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        try {
          await deleteAd(adId);
          // Remove the card from UI
          btn.closest(".ad-card").remove();
          // Update the count
          const sectionTitle = document.querySelector(".section-title");
          const currentCount = parseInt(
            sectionTitle.textContent.match(/\d+/)[0]
          );
          sectionTitle.textContent = sectionTitle.textContent.replace(
            `(${currentCount})`,
            `(${currentCount - 1})`
          );
        } catch (error) {
          btn.innerHTML = originalText;
          btn.disabled = false;
          alert("İlan silinirken bir hata oluştu: " + error.message);
        }
      }
    });
  });
}

// js/DeleteAd.js
export async function deleteAd(adId) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await fetch(`http://localhost:5000/api/me/ads/${adId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting ad:", error);
    throw error;
  }
}

export async function loadProductsToUser(containerId, url) {
  const products = await GetAllProductsForUser(url);
  if (products.rowCount === 0) return 0;
  const container = document.getElementById(containerId);
  container.innerHTML = products.rows.map(MakeProductCardforUser).join("");

  container.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the card click event from firing
      const adId = btn.dataset.adId;
      window.location.href = `./edit-ad.html?id=${adId}`;
    });
  });
  setupDeleteButtons(container);
  return products.rowCount;
}
