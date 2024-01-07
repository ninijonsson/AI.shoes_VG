"use strict";

// Gör sorterade variabeln till en global variabel
let sortedProducts;

// Väntar tills DOM laddats in för att få koden att funka
// Annars är sortSelect = null
document.addEventListener("DOMContentLoaded", function () {
    // Kommer åt vår #sort_by som finns i filterbutton.js
    const sortSelect = document.getElementById("sort_by");

    // Kontrollera att sortSelect har en värde
    console.log(sortSelect);

    // Eftersom sortSelect har HTML-taggen "select" kan vi använda oss
    // av "change", kommer att triggas när vi valt en av våra "options"
    sortSelect.addEventListener("change", sortProducts);

    // Denna funktionen anropas av event listenern ovan
    // Sorterar skorna beroende på valt alternativ
    function sortProducts() {
        const sortOption = sortSelect.value; // option-taggens value

        // Kontrollera värdet
        console.log(sortSelect.value);

        // Selekterar klassen med MAX PRICE i filterbutton.js
        const maxPrice = parseInt(document.querySelector(".input-price").value, 10) || 0;
        // Array.from() skapar en ny array av, i detta fall nodelist av
        // .country-box, vilket är våra checkboxes
        // Den konverterar nodelist till array för att kunna använda
        // metoderna .filter() och .map()
        const selectedCountryIds = Array.from(document.querySelectorAll('.country-box'))
            // Därefter .filter() som funkar som array_filter
            // Inkluderar endast elementen som är inkryssade
            .filter(checkbox => checkbox.checked)
            // När vi filtrerat endast de ikryssade elementen
            // konverterar vi dem till siffror med parseInt
            .map(checkbox => parseInt(checkbox.id));

        switch (sortOption) {
            case "lowestPrice":
                /* Använder oss av metoden ".sort()"
                Om a - b är negativt, kommer a före eftersom a < b
                Vi vill få lägsta priset först */
                // Utgår ifrån clickedArrayShoe som finns i navShoeKind.js
                // som en global variabel och är en filtrerad array
                sortedProducts = clickedShoeArray.filter(product =>
                    product.price <= maxPrice &&
                    (selectedCountryIds.length === 0 || selectedCountryIds.includes(product.country_id))
                ).sort((a, b) => a.price - b.price);
                break;
            case "highestPrice":
                /* Och tvärtom här, blir b - a negativt kommer
                b före eftersom b < a */
                sortedProducts = clickedShoeArray.filter(product =>
                    product.price <= maxPrice &&
                    (selectedCountryIds.length === 0 || selectedCountryIds.includes(product.country_id))
                ).sort((a, b) => b.price - a.price);
                break;
            case "alphabeticalOrder":
                sortedProducts = clickedShoeArray.filter(product =>
                    product.price <= maxPrice &&
                    (selectedCountryIds.length === 0 || selectedCountryIds.includes(product.country_id))
                ).sort((a, b) => {
                    // Funkar som array_find() men är en inbyggd metod
                    // country är COUNTRIES och a.country_id är SHOES
                    // .name i slutet för att få namnet på produktionsland
                    const countryA = COUNTRIES.find(country => country.id === a.country_id).name;
                    const countryB = COUNTRIES.find(country => country.id === b.country_id).name;
                    /* A negative number if referenceStr (= countryA) occurs before
                    compareString (= countryB); positive if the referenceStr occurs
                    after compareString; 0 if they are equivalent. */
                    return countryA.localeCompare(countryB);

                    // Med värdena vi får av localeCompare kan vi sortera skor
                    // beroende på landets namn
                });
                break;
            case "reverseOrder":
                sortedProducts = clickedShoeArray.filter(product =>
                    product.price <= maxPrice &&
                    (selectedCountryIds.length === 0 || selectedCountryIds.includes(product.country_id))
                ).sort((a, b) => {
                    const countryA = COUNTRIES.find(country => country.id === a.country_id).name;
                    const countryB = COUNTRIES.find(country => country.id === b.country_id).name;
                    return countryB.localeCompare(countryA);
                });
                break;
        }

        // Kallar på renderShoeList() med den sorterade arrayen som argument
        // och parent som är bottom i strukturen (structure.js)
        renderShoeList(structureContainers.bottom, sortedProducts);
    }

});