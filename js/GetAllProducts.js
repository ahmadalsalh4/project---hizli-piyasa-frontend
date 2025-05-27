import {CalcDayDiffInDays} from './util.js';

async function GetAllProducts(url){
    const res = await fetch(url);
    const data = await res.json();
    return data.rows;
}

function MakeProductCard(product) {
        return `
            <div class="ad-card">
                <div class="ad-image">
                    <img src="${product.image_path || 'default-image.jpg'}" alt="${product.title}">
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

function GetDateString(date){
    const DateDiff = CalcDayDiffInDays(date);
    if(DateDiff == 0)
        return "Bügün";
    else
        return DateDiff + " Gün önce";
}

export async function loadProductsTo(containerId,url) {
  const products = await GetAllProducts(url);
  const container = document.getElementById(containerId);
  container.innerHTML = products.map(MakeProductCard).join('');
}
