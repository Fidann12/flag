const pagination = document.getElementById("pagination");
const countryPerPage = 10;
let activePage = 1;
const paginate = () => {
  pagination.innerHTML = "";
  let totalPage = Math.ceil(country.length / countryPerPage);
  let start = activePage - 3 > 0 ? activePage - 3 : 1;
  let end = activePage + 3;
  for (let i = start; i <= end && i <= totalPage; i++) {
    let page = document.createElement("li");
    if (i === activePage) {
      page.classList.add("active");
    }
    page.textContent = i;
    page.addEventListener("click", () => {
      activePage = i;
      paginate();
      showCountries((i - 1) * countryPerPage);
    });
    pagination.append(page);
  }
};

// const orderRows = () => {
//   const rows = [...document.querySelectorAll("tbody tr")];
//   rows.map((row, b) => {
//     row.querySelector("td").textContent = b + 1;
//   });
// };
const tbody = document.getElementById("tbody");
let countries = [];
const showCountries = (start = 0) => {
  tbody.innerHTML = "";
  country.slice(start, start + countryPerPage).map((b) => {
    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    nameTd.textContent = b.name.common;
    tr.append(nameTd);
    const capitalTd = document.createElement("td");
    capitalTd.textContent = b.capital;
    tr.append(capitalTd);
    const populationTd = document.createElement("td");
    populationTd.textContent = b.population;
    tr.append(populationTd);
    const regionTd = document.createElement("td");
    regionTd.textContent = b.region;
    tr.append(regionTd);
    const flagsTd = document.createElement("td");
    const flagImg = document.createElement("img");
    flagImg.setAttribute("src", b.flags.svg);
    flagsTd.append(flagImg);
    tr.append(flagsTd);
    tbody.append(tr);
  });
};
const getCountries = async () => {
  country = await fetch("https://restcountries.com/v3.1/all")
    .then((a) => a.json())
    .then((a) => a);
  showCountries();
};
getCountries().then(paginate);
