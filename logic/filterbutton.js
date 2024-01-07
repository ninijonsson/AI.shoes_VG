"use strict"

function renderFilterButton(parent) {
  // Container till knapp
  const buttonContainer = document.createElement("div");

  // Skapar knappen och vad som står på knappen med innerHTML
  const filterButton = document.createElement('button');
  filterButton.innerHTML = `
    <img src="media/icons/filter.png" alt="filter button">
    <p>FILTER</p>
  `;
  // Lägger till en klass till knappen för att kunna styla i CSS
  filterButton.classList.add('filter-button');

  const sortBy = document.createElement("div");
  sortBy.classList.add("sortByContainer");
  buttonContainer.appendChild(sortBy);

  sortBy.innerHTML = `
  <p><b>SORT BY: </b></p>
  <select id="sort_by">
      <option value="">PLEASE CHOOSE SORTING</option>
      <option value="lowestPrice">PRICE: LOW TO HIGH PRICE</option>
      <option value="highestPrice">PRICE: HIGH TO LOW PRICE</option>
      <option value="alphabeticalOrder">COUNTRY OF PRODUCTION: A TO Z</option>
      <option value="reverseOrder">COUNTRY OF PRODUCTION: Z TO A</option>
  </select>
  `;

  buttonContainer.classList.add('filter-container');
  buttonContainer.appendChild(filterButton);

  const container = document.querySelector("#top");
  if (container) {
    container.parentNode.insertBefore(buttonContainer, container.nextSibling);
  }

  const filterPopup = document.createElement("div");
  filterPopup.classList.add("filter-popup");

  filterPopup.innerHTML = `
      <div class="filter-content">
        <span class="close-button">x</span>
        <h1>FILTER</h1>
        <div class="filter-content-types">
          <div>
            <h3>MAX PRICE</h3>
            <p> Up to: <input type="text" class="input-price" value="2000"> KR </p>
          </div>
          <div>
            <h3>MADE IN</h3>
            <label for="Sweden"><input id="1" class="country-box" type="checkbox"> Sweden </label>
            <label for="Spain"><input id="2" class="country-box" type="checkbox"> Spain </label>
            <label for="Germany"><input id="3" class="country-box" type="checkbox"> Germany </label>
            <label for="USA"><input id="4" class="country-box" type="checkbox"> USA </label>
            <label for="UK"><input id="5" class="country-box" type="checkbox"> UK </label>
            <label for="France"><input id="6" class="country-box" type="checkbox"> France </label>
            <label for="Italy"><input id="7" class="country-box" type="checkbox"> Italy </label>
            <label for="Japan"><input id="8" class="country-box" type="checkbox"> Japan </label>
          </div>
        </div>
    `;

  document.body.appendChild(filterPopup);

  filterButton.addEventListener("click", function () {
    filterPopup.style.display = "block";
  });

  const closeButton = filterPopup.querySelector('.close-button');

  closeButton.addEventListener("click", function () {
    filterPopup.style.display = "none";
  });

  // Filter products based on price
  const inputPrice = document.querySelector(".input-price");
  const checkedCountries = document.querySelectorAll(".country-box");

  inputPrice.addEventListener("input", filterProducts);

  checkedCountries.forEach(function (checkbox) {
    checkbox.addEventListener("change", filterProducts);
  });

  // Funktion som filtrerar skor baserat på priset man skrivit in,
  // anropas när man skrivit in något i "MAX PRICE"
  function filterProducts() {
    console.log();
    const maxPrice = parseInt(inputPrice.value, 10) || 0;

    const selectedCountryIds = Array.from(checkedCountries).filter(checkbox => checkbox.checked).map(checkbox => parseInt(checkbox.id, 10));

    const sortSelect = document.getElementById("sort_by");
    const sortOption = sortSelect.value;
    if (sortOption === "lowestPrice") {
      clickedShoeArray.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highestPrice") {
      clickedShoeArray.sort((a, b) => b.price - a.price);
    } else if (sortOption === "alphabeticalOrder") {
      clickedShoeArray.sort((a, b) => {
        // Funkar som array_find() men är en inbyggd metod
        // country är COUNTRIES och a.country_id är SHOES
        // .name i slutet för att få namnet på produktionsland
        const countryA = COUNTRIES.find(country => country.id === a.country_id).name;
        const countryB = COUNTRIES.find(country => country.id === b.country_id).name;
        /* A negative number if referenceStr (= countryA) occurs before
        compareString (= countryB); positive if the referenceStr occurs
        after compareString; 0 if they are equivalent. */
        return countryA.localeCompare(countryB);
      })
    } else if (sortOption === "reverseOrder") {
      clickedShoeArray.sort((a, b) => {
        // Funkar som array_find() men är en inbyggd metod
        // country är COUNTRIES och a.country_id är SHOES
        // .name i slutet för att få namnet på produktionsland
        const countryA = COUNTRIES.find(country => country.id === a.country_id).name;
        const countryB = COUNTRIES.find(country => country.id === b.country_id).name;
        /* A negative number if referenceStr (= countryA) occurs before
        compareString (= countryB); positive if the referenceStr occurs
        after compareString; 0 if they are equivalent. */
        return countryB.localeCompare(countryA);
      })
    }

    // Filter the products based on the entered price
    let filteredProducts;
    // Check if clickedShoeArray is defined and not empty
    if (clickedShoeArray.length > 0) {
      // Use clickedShoeArray as the source of products if available
      filteredProducts = clickedShoeArray.filter(product =>
        product.price <= maxPrice &&
        (selectedCountryIds.length === 0 || selectedCountryIds.includes(product.country_id))
      );
    }
    else {
      // Otherwise, use the original SHOES array for filtering
      filteredProducts = SHOES.filter(product =>
        product.price <= maxPrice &&
        (selectedCountryIds.length === 0 || selectedCountryIds.includes(product.country_id))
      );
    }

    console.log(filteredProducts);

    // Render the filtered products
    renderShoeList(structureContainers.bottom, filteredProducts);
  }
};