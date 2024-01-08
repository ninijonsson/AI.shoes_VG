"use strict";

function renderShoeList(parent, shoes) {
    const container = document.createElement("div");
    container.id = "shoe_list";
    parent.append(container);

    // Listan på skorna ska renderas inom containern <ol>
    container.innerHTML = `
    <ol></ol>
  `;

    updateShoeList(shoes);
}

function updateShoeList(shoes) {
    const container = document.querySelector("#shoe_list");
    const listDom = container.querySelector("ol");
    const feedbackDom = document.querySelector(".feedback");

    // Default
    listDom.innerHTML = "";

    /* Filtrerar skorna, ska finnas i logic > filter.js */
    if (shoes === undefined) {
        feedbackDom.style.display = "block";
        feedbackDom.style.marginLeft = "92px";
        feedbackDom.style.marginTop = "-17px";
        feedbackDom.textContent = "Select filters to see shoes.";
    }
    else if (shoes.length === 0) {
        feedbackDom.style.display = "block";
        feedbackDom.style.marginLeft = "92px";
        feedbackDom.style.marginTop = "-17px";
        feedbackDom.textContent = "No shoes found with your filters selected.";
    }
    else {
        // Finns resultat vill vi inte att feedback ska synas
        feedbackDom.style.display = "none";
        for (let shoe of shoes) {
            // shoes.js
            renderShoes(listDom, shoe);
        }
    }
}