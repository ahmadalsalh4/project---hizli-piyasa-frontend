export function CalcDayDiffInDays(dateToCalc) {
  const today = new Date();
  const date = new Date(dateToCalc);

  const timeDiff = today.getTime() - date.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
}

export async function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]); // Remove data URL prefix
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function loadCategoryNamesTo(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
  <select id="ad-category" name="ad-category" required>
  <option >Kategori seçin</option>
  <option value="1">elektronik</option>
  <option value="2">giyim</option>
  <option value="3">emlak</option>
  <option value="4">arac</option>
  <option value="5">ders</option>
  <option value="6">spor</option>
  <option value="7">endustri</option>
  <option value="8">hayvan</option>
  </select>
`;
}

export async function loadcitiesNamesTo(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
  <select id="ad-city" name="ad-city" required>
  <option>Şehir seçin</option>
  <option value="34">adana</option>
  <option value="2">adiyaman</option>
  <option value="68">aksaray</option>
  <option value="3">afyonkarahisar</option>
  <option value="4">agri</option>
  <option value="5">amasya</option>
  <option value="6">ankara</option>
  <option value="7">antalya</option>
  <option value="75">ardahan</option>
  <option value="8">artvin</option>
  <option value="9">aydin</option>
  <option value="10">balikesir</option>
  <option value="74">bartin</option>
  <option value="72">batman</option>
  <option value="69">bayburt</option>
  <option value="11">bilecik</option>
  <option value="12">bingol</option>
  <option value="13">bitlis</option>
  <option value="14">bolu</option>
  <option value="15">burdur</option>
  <option value="16">bursa</option>
  <option value="17">canakkale</option>
  <option value="18">cankiri</option>
  <option value="19">corum</option>
  <option value="20">denizli</option>
  <option value="21">diyarbakir</option>
  <option value="81">duzce</option>
  <option value="22">edirne</option>
  <option value="23">elazig</option>
  <option value="24">erzincan</option>
  <option value="25">erzurum</option>
  <option value="26">eskisehir</option>
  <option value="27">gaziantep</option>
  <option value="28">giresun</option>
  <option value="29">gumushane</option>
  <option value="30">hakkari</option>
  <option value="31">hatay</option>
  <option value="76">igdir</option>
  <option value="32">isparta</option>
  <option value="1">istanbul</option>
  <option value="35">izmir</option>
  <option value="46">kahramanmaras</option>
  <option value="78">karabuk</option>
  <option value="70">karaman</option>
  <option value="36">kars</option>
  <option value="37">kastamonu</option>
  <option value="38">kayseri</option>
  <option value="71">kirikkale</option>
  <option value="39">kirklareli</option>
  <option value="40">kirsehir</option>
  <option value="79">kilis</option>
  <option value="41">kocaeli</option>
  <option value="42">konya</option>
  <option value="43">kutahya</option>
  <option value="44">malatya</option>
  <option value="45">manisa</option>
  <option value="47">mardin</option>
  <option value="33">mersin</option>
  <option value="48">mugla</option>
  <option value="49">mus</option>
  <option value="50">nevsehir</option>
  <option value="51">nigde</option>
  <option value="52">ordu</option>
  <option value="80">osmaniye</option>
  <option value="53">rize</option>
  <option value="54">sakarya</option>
  <option value="55">samsun</option>
  <option value="56">siirt</option>
  <option value="57">sinop</option>
  <option value="58">sivas</option>
  <option value="63">sanliurfa</option>
  <option value="73">sirnak</option>
  <option value="59">tekirdag</option>
  <option value="60">tokat</option>
  <option value="61">trabzon</option>
  <option value="62">tunceli</option>
  <option value="64">usak</option>
  <option value="65">van</option>
  <option value="77">yalova</option>
  <option value="66">yozgat</option>
  <option value="67">zonguldak</option>
</select>
`;
}

export async function LoadHeader(id) {
  const response = await fetch("./partials/header.html");
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

export async function LoadSearch(id) {
  const response = await fetch("./partials/search.html");
  const html = await response.text();
  document.getElementById(id).innerHTML = html;

  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchInput = searchForm.querySelector('input[name="search"]');
      const keyword = searchInput.value.trim();
      if (keyword) {
        // Navigate to search page with the query parameter
        window.location.href = `search.html?search=${encodeURIComponent(
          keyword
        )}`;
      }
    });
  }
}

export async function LoadBanner(id) {
  const response = await fetch("./partials/banner.html");
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

export async function LoadCategories(id) {
  const response = await fetch("./partials/categories.html");
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

export async function LoadFooter(id) {
  const response = await fetch("./partials/footer.html");
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

export function LogOut() {
  localStorage.clear();
  setTimeout(() => {
    window.location.href = "./index.html";
  }, 150);
}
