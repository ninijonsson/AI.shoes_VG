"use strict";

function addToCart(shoe, size) {
    renderShoesInCart(shoe, size);
}

function renderShoesInCart(shoe, size) {
    let container = document.querySelector(".shoes_in_cart");
    let addedShoe = document.createElement("div");
    addedShoe.id = "shoe_in_cart";
    container.appendChild(addedShoe);
    addedShoe.innerHTML = `
    <div id="shoe_image"><img src="./media/skobilder/${shoe.file_name}" alt="Shoes"></div>
    <div id="shoe_info">
        <div id="shoe_name">${shoe.name.toUpperCase()}</div>
        <div id="shoe_size">${size}</div>
        <p id="shoe_price">${shoe.price} KR</p> 
        <img src="media/icons/trash_can.png" alt="Remove shoe" id="remove_shoe">
    </div>
    `;

    let removeShoeButton = document.querySelector("#remove_shoe");
    removeShoeButton.addEventListener("click", function () {
        addedShoe.remove();
    })
}