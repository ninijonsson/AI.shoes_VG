"use strict";

function renderSortBy(parent) {
    const container = document.createElement("div");
    container.classList.add("sortByContainer");
    parent.appendChild(container);

    container.innerHTML = `
    <select id="sort_by">
        <option value="lowestValue">PRICE: LOW TO HIGH PRICE</option>
    </select>
    `;
}