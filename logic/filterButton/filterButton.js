"use strict"

function renderFilterButton(parent) {
  const buttonContainer = document.createElement('div');
  const filterButton = document.createElement('button');
  filterButton.innerHTML = `
    <img src="media/icons/filter.png" alt="Filter">
    FILTER
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
            <h3> TYPE OF SHOE</h3>
            <span><input type="checkbox">BOOTS </span>
            <span><input type="checkbox">SNEAKERS </span>
            <span><input type="checkbox">TOFFLOR </span>
          </div>
          <div>
            <h3> MAX PRICE </h3>
            <p> UP TO: <input type="text" size="5"> KR </p>
          </div>
          <div>
            <h3> MADE IN</h3>
            <span><input type="checkbox">SPAIN </span>
            <span><input type="checkbox">PORTUGAL </span>
            <span><input type="checkbox">UNITED KINGDOM </span>
            <span><input type="checkbox">SWEDEN </span>
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
}

// document.addEventListener('DOMContentLoaded', function () {

//   const filterButton = document.createElement('button');
//   filterButton.innerHTML = `
//     <img src="media/icons/filter.png" alt="Filter">
//     FILTER
//   `;
//   filterButton.classList.add('filter-button');

//   const buttonContainer = document.createElement('div');
//   buttonContainer.classList.add('filter-container');
//   buttonContainer.appendChild(filterButton);

//   const header = document.querySelector('header');
//   if (header) {
//     header.parentNode.insertBefore(buttonContainer, header.nextSibling);
//   }

//   const filterPopup = document.createElement('div');
//   filterPopup.classList.add('filter-popup');

//   filterPopup.innerHTML = `
//       <div class="filter-content">
//         <span class="close-button">x</span>
//         <h1>FILTER</h1>
//         <div class="filter-content-types">
//           <div>
//             <h3> TYPE OF SHOE</h3>
//             <span><input type="checkbox">BOOTS </span>
//             <span><input type="checkbox">SNEAKERS </span>
//             <span><input type="checkbox">TOFFLOR </span>
//           </div>
//           <div>
//             <h3> MAX PRICE </h3>
//             <p> UP TO: <input type="text" size="5"> KR </p>
//           </div>
//           <div>
//             <h3> MADE IN</h3>
//             <span><input type="checkbox">SPAIN </span>
//             <span><input type="checkbox">PORTUGAL </span>
//             <span><input type="checkbox">UNITED KINGDOM </span>
//             <span><input type="checkbox">SWEDEN </span>
//           </div>
//         </div>
//     `;

//   document.body.appendChild(filterPopup);

//   filterButton.addEventListener('click', function () {
//     filterPopup.style.display = 'block';
//   });

//   const closeButton = filterPopup.querySelector('.close-button');
//   closeButton.addEventListener('click', function () {
//     filterPopup.style.display = 'none';
//   });
// });


