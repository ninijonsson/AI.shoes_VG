"use strict";

let totalPrice = 0;

function addToCart(shoe, size) {
    renderShoesInCart(shoe, size);
}

function renderShoppingCartPopup(parent) {
    const shoppingCart = document.createElement("img");
    shoppingCart.classList.add("shopping_cart");
    shoppingCart.src = "media/icons/shopping_bag.png";
    parent.appendChild(shoppingCart);

    const shoppingPopup = document.createElement("div");
    shoppingPopup.classList.add("shopping_popup");

    shoppingPopup.innerHTML = `
    <div class="shopping_content">
        <span class="close_button">x</span>
        <h1>YOUR CART</h1>
        <div class="shoes_in_cart"></div>

        <div class="total_box">
            <h3 class="total_price_text">TOTAL</h3>
            <p class="total_price">${totalPrice} KR</p>
        </div>

        <div class="checkout">
            <p>CHECKOUT</p>
        </div>
    </div>
    `

    document.body.appendChild(shoppingPopup);

    shoppingCart.addEventListener("click", function () {
        shoppingPopup.style.display = "block";
    })

    const closeButton = shoppingPopup.querySelector(".close_button");
    closeButton.addEventListener("click", function () {
        shoppingPopup.style.display = "none";
    })
}

function renderShoesInCart(shoe, size) {
    totalPrice += shoe.price;
    console.log(totalPrice);
    let container = document.querySelector(".shoes_in_cart");
    let addedShoe = document.createElement("div");
    addedShoe.id = "shoe_in_cart";
    container.appendChild(addedShoe);
    addedShoe.innerHTML = `
    <div class="shoe_image"><img src="./media/skobilder/${shoe.file_name}" alt="Shoes"></div>
    <div class="shoe_info">
        <div class="shoe_name">${shoe.name.toUpperCase()}</div>
        <div class="shoe_size">${size}</div>
        <p class="shoe_price">${shoe.price} KR</p> 
        <img src="media/icons/trash_can.png" alt="Remove shoe" class="remove_shoe">
    </div>
    `;

    let removeShoeButton = document.querySelector(".remove_shoe");
    removeShoeButton.addEventListener("click", function () {
        addedShoe.remove();
        totalPrice -= shoe.price;
        updateTotalPrice(); // Update the total price when a shoe is removed
    });

    updateTotalPrice(); // Update the total price when a new shoe is added
}

// Funktion som uppdaterar totalpriset
function updateTotalPrice() {
    let totalElement = document.querySelector(".total_price");
    totalElement.textContent = `${totalPrice} KR`;
}