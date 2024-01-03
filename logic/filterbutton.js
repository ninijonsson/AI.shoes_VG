"use strict"

function renderFilterButton(parent) {
  const buttonContainer = document.createElement('div');

  const filterButton = document.createElement('button');
  filterButton.innerHTML = `
    <img src="media/icons/filter.png" alt="filter button">
    <p>FILTER</p>
  `;
  filterButton.classList.add('filter-button');

  const sortBy = document.createElement("div");
  sortBy.classList.add("sortByContainer");
  buttonContainer.appendChild(sortBy);

  sortBy.innerHTML = `
  <p><b>SORT BY: </b></p>
  <select id="sort_by">
      <option value="lowestPrice">PRICE: LOW TO HIGH PRICE</option>
      <option value="highestPrice">PRICE: HIGH TO LOW PRICE</option>
      <option value="alphabeticalOrder">COUNTRY OF PRODUCTION: A TO Z</option>
      <option value="reverseOrder">COUNTRY OF PRODUCTION: Z TO A</option>
  </select>
  `;

  buttonContainer.classList.add('filter-container');
  buttonContainer.appendChild(filterButton);

  const container = document.querySelector('#top');
  if (container) {
    container.parentNode.insertBefore(buttonContainer, container.nextSibling);
  }

  const filterPopup = document.createElement('div');
  filterPopup.classList.add('filter-popup');

  filterPopup.innerHTML = `
      <div class="filter-content">
        <span class="close-button">x</span>
        <h1>FILTER</h1>
        <div class="filter-content-types">
          <div>
            <h3>MAX PRICE</h3>
            <p> Up to: <input type="text" class="input-price"> KR </p>
          </div>
          <div>
            <h3>MADE IN</h3>
            <label for="Spain"><input id="Spain" class="input-box" type="checkbox"> Spain </label>
            <label for="Portugal"><input id="Portugal" class="input-box" type="checkbox"> Portugal </label><br>
            <label for="Kingdom"><input id="Kingdom" class="input-box" type="checkbox"> United Kingdom </label><br>
            <label for="Sweden"><input id="Sweden" class="input-box" type="checkbox"> Sweden </label>
          </div>
        </div>
    `;

  document.body.appendChild(filterPopup);

  filterButton.addEventListener('click', function () {
    filterPopup.style.display = 'block';
  });

  const closeButton = filterPopup.querySelector('.close-button');

  closeButton.addEventListener('click', function () {
    filterPopup.style.display = 'none';
  });
};


