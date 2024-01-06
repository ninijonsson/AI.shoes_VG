"use strict";

document.addEventListener('DOMContentLoaded', function () {
    // Your code here

    const sortSelect = document.getElementById('sort_by');

    console.log(sortSelect);

    // Add change event listener to the sort select
    sortSelect.addEventListener('change', sortProducts);

    function sortProducts() {
        const sortOption = sortSelect.value;

        console.log(sortSelect.value);

        let sortedProducts;

        switch (sortOption) {
            case 'lowestPrice':
                sortedProducts = SHOES.slice().sort((a, b) => a.price - b.price);
                break;
            case 'highestPrice':
                sortedProducts = SHOES.slice().sort((a, b) => b.price - a.price);
                break;
            case "alphabeticalOrder":
                sortedProducts = COUNTRIES.name.sort();
                console.log(sortedProducts);
                break;
            default:
                // Default sorting (no sorting)
                sortedProducts = SHOES.slice();
        }


        renderShoeList(structureContainers.bottom, sortedProducts);
    }

});