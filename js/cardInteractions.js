export function initCardInteractions() {
  document.addEventListener("click", handleCardInteractions);
}

function handleCardInteractions(e) {
  // Edit button
  if (e.target.closest(".edit-btn")) {
    handleEditAction(e);
    return;
  }

  // Delete button
  if (e.target.closest(".delete-btn")) {
    handleDeleteAction(e);
    return;
  }

  // Card click
  const cardLink = e.target.closest(".ad-card-link");
  if (cardLink && !e.target.closest(".ad-actions")) {
    handleCardClick(e, cardLink);
  }
}

function handleEditAction(e) {
  e.preventDefault();
  e.stopPropagation();
  const adId = getAdIdFromElement(e.target, ".edit-btn");
  if (adId) {
    navigateTo(`/pages/edit-ad.html?id=${adId}`);
  }
}

function handleDeleteAction(e) {
  e.preventDefault();
  e.stopPropagation();
  const adId = getAdIdFromElement(e.target, ".delete-btn");

  if (adId && confirm("Bu ilanı silmek istediğinize emin misiniz?")) {
    deleteAd(adId)
      .then(() => removeCardFromDOM(adId))
      .catch(handleDeleteError);
  }
}

function handleCardClick(e, cardLink) {
  e.preventDefault();
  const adId = cardLink.href.split('/').pop() || 
               cardLink.closest('.ad-card')?.dataset?.adId;
  if (adId) {
    navigateTo(`/pages/ad-detailed.html?id=${adId}`);
  }
}

function getAdIdFromElement(element, selector) {
  const el = element.closest(selector);
  return el?.dataset?.adId || el?.getAttribute('data-ad-id');
}

function navigateTo(url) {
  // Ensure proper path formatting
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
  window.location.href = normalizedUrl;
}

async function deleteAd(adId) {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`http://localhost:5000/api/me/ads/${adId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete ad");
  }
}

function removeCardFromDOM(adId) {
  const card = document.querySelector(`.ad-card[data-ad-id="${adId}"]`);
  if (card) {
    card.style.opacity = '0';
    setTimeout(() => card.remove(), 300);
  }
}

function handleDeleteError(error) {
  console.error("Error deleting ad:", error);
  alert(error.message || "Bir hata oluştu");
}