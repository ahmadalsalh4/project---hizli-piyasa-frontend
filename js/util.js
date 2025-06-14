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
  <option value="1">Elektronik</option>
  <option value="2">ev</option>
  <option value="3">arac</option>
  <option value="4">spoe</option>
  <option value="5">giyim</option>
  <option value="6">mobilya</option>
  <option value="7">bebek</option>
  <option value="8">ders</option>
  </select>
`;
}

export async function loadcitiesNamesTo(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
  <select id="ad-city" name="ad-city" required>
  <option >Şehir seçin</option>
  <option value="34">Adana</option>
  <option value="2">Adıyaman</option>
  <option value="68">Aksaray</option>
  <option value="3">Afyonkarahisar</option>
  <option value="4">Ağrı</option>
  <option value="5">Amasya</option>
  <option value="6">Ankara</option>
  <option value="7">Antalya</option>
  <option value="75">Ardahan</option>
  <option value="8">Artvin</option>
  <option value="9">Aydın</option>
  <option value="10">Balıkesir</option>
  <option value="74">Bartın</option>
  <option value="72">Batman</option>
  <option value="69">Bayburt</option>
  <option value="11">Bilecik</option>
  <option value="12">Bingöl</option>
  <option value="13">Bitlis</option>
  <option value="14">Bolu</option>
  <option value="15">Burdur</option>
  <option value="16">Bursa</option>
  <option value="17">Çanakkale</option>
  <option value="18">Çankırı</option>
  <option value="19">Çorum</option>
  <option value="20">Denizli</option>
  <option value="21">Diyarbakır</option>
  <option value="81">Düzce</option>
  <option value="22">Edirne</option>
  <option value="23">Elazığ</option>
  <option value="24">Erzincan</option>
  <option value="25">Erzurum</option>
  <option value="26">Eskişehir</option>
  <option value="27">Gaziantep</option>
  <option value="28">Giresun</option>
  <option value="29">Gümüşhane</option>
  <option value="30">Hakkari</option>
  <option value="31">Hatay</option>
  <option value="76">Iğdır</option>
  <option value="32">Isparta</option>
  <option value="1">İstanbul</option>
  <option value="35">İzmir</option>
  <option value="46">Kahramanmaraş</option>
  <option value="78">Karabük</option>
  <option value="70">Karaman</option>
  <option value="36">Kars</option>
  <option value="37">Kastamonu</option>
  <option value="38">Kayseri</option>
  <option value="71">Kırıkkale</option>
  <option value="39">Kırklareli</option>
  <option value="40">Kırşehir</option>
  <option value="79">Kilis</option>
  <option value="41">Kocaeli</option>
  <option value="42">Konya</option>
  <option value="43">Kütahya</option>
  <option value="44">Malatya</option>
  <option value="45">Manisa</option>
  <option value="47">Mardin</option>
  <option value="33">Mersin</option>
  <option value="48">Muğla</option>
  <option value="49">Muş</option>
  <option value="50">Nevşehir</option>
  <option value="51">Niğde</option>
  <option value="52">Ordu</option>
  <option value="80">Osmaniye</option>
  <option value="53">Rize</option>
  <option value="54">Sakarya</option>
  <option value="55">Samsun</option>
  <option value="56">Siirt</option>
  <option value="57">Sinop</option>
  <option value="58">Sivas</option>
  <option value="63">Şanlıurfa</option>
  <option value="73">Şırnak</option>
  <option value="59">Tekirdağ</option>
  <option value="60">Tokat</option>
  <option value="61">Trabzon</option>
  <option value="62">Tunceli</option>
  <option value="64">Uşak</option>
  <option value="65">Van</option>
  <option value="77">Yalova</option>
  <option value="66">Yozgat</option>
  <option value="67">Zonguldak</option>
</select>
`;
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
  }, 150);
}
