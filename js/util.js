export function CalcDayDiffInDays(dateToCalc) {
  const today = new Date();
  const date = new Date(dateToCalc);

  const timeDiff = today.getTime() - date.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
}

export async function LoadHeader(id) {
  const response = await fetch("../partials/header.html");
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

export async function LoadSearch(id) {
  const response = await fetch("../partials/search.html");
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

export async function LoadBanner(id) {
  const response = await fetch("../partials/banner.html");
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

export async function LoadCategories(id) {
  const response = await fetch("../partials/categories.html");
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

export async function LoadFooter(id) {
  const response = await fetch("../partials/footer.html");
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

export function LogOut() {
  localStorage.clear();
  setTimeout(() => {
    window.location.href = "./index.html";
  }, 300);
}
