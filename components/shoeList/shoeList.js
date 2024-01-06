"use strict";

function renderShoeList(parent, shoes) {
    const container = document.createElement("div");
    container.id = "shoeList";
    parent.append(container);

    /* Feedback-klassen ifall vi inte får upp resultat på några skor
    <ol>-taggen för att skriva ut alla skor */
    container.innerHTML = `
    <ol></ol>
  `;

    updateShoeList(shoes);
}

function updateShoeList(shoes) {
    const container = document.querySelector("#shoeList");
    const listDom = container.querySelector("ol");
    const feedbackDom = document.querySelector(".feedback");

    console.log(shoes.length);

    listDom.innerHTML = "";

    /* Filtrerar skorna, ska finnas i logic > filter.js */
    // const shoes = filterShoes();

    if (shoes === undefined) {
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
            renderShoes(listDom, shoe);
        }
    }
}