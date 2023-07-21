const tbody = document.getElementById("tbody");
const pagination = document.getElementById("pagination");
const countryPerPage = 10;
let countries = [];
let activePage = 1;
const paginate = () => {
  pagination.innerHTML = "";
  let totalPage = Math.ceil(countries.length / countryPerPage);
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
const showCountries = (start = 0) => {
  tbody.innerHTML = "";
  countries.slice(start, start + countryPerPage).map((country) => {
    const row = document.createElement("tr");
    const name = document.createElement("td");
    name.textContent = country.name.common;
    const capital = document.createElement("td");
    capital.textContent = country.capital ? country.capital[0] : "";
    const region = document.createElement("td");
    region.textContent = country.region;
    const population = document.createElement("td");
    population.textContent = country.population;
    const area = document.createElement("td");
    area.textContent = country.area;
    const flag = document.createElement("td");
    const flagImg = document.createElement("img");
    flagImg.setAttribute("src", country.flags.svg);
    flag.append(flagImg);
    row.append(name, capital, population, area, flag);
    tbody.append(row);
  });
};
const getCountries = async () => {
  countries = await fetch("https://restcountries.com/v3.1/all")
    .then((a) => a.json())
    .then((a) => a);
  showCountries();
};
getCountries().then(paginate);
