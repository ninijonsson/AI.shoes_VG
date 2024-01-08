"use strict";

// Gör totala priset i varukorgen till en global variabel
let totalPrice = 0;

// Funktion som renderar popup till varukorgen
// Anropas i index.js
function renderShoppingCartPopup(parent) {
    const shoppingCart = document.createElement("img"); // Skapar loggan med varukorgen
    shoppingCart.classList.add("shopping_cart");
    shoppingCart.src = "media/icons/shopping_bag.png";
    parent.appendChild(shoppingCart); // Lägger till i parent-elementet, alltså headern

    const shoppingPopup = document.createElement("div"); // div för popup
    shoppingPopup.classList.add("shopping_popup");

    shoppingPopup.innerHTML = `
    <div class="shopping_content">
        <span class="close_button">x</span>
        <h1>YOUR CART</h1>
        <div class="shoes_container"></div>

        <div class="total_box">
            <h3 class="total_price_text">TOTAL</h3>
            <p class="total_price">${totalPrice} KR</p>
        </div>

        <div class="checkout">
            <p>CHECKOUT</p>
        </div>
    </div>
    `;

    // Denna kommer att ha "display: none" som default
    document.body.appendChild(shoppingPopup);

    shoppingCart.addEventListener("click", function () {
        shoppingPopup.style.display = "block";
    })

    const closeButton = shoppingPopup.querySelector(".close_button");
    closeButton.addEventListener("click", function () {
        shoppingPopup.style.display = "none";
    })
}

// Funktion som renderar skorna i varukorgen som man lagt till
function renderShoesInCart(shoe, size) {
    totalPrice += shoe.price; // Uppdaterar totala priset

    // Från shoppingPopup.innerHTML
    let container = document.querySelector(".shoes_container");
    let addedShoe = document.createElement("div");
    addedShoe.id = "shoe_in_cart";
    container.appendChild(addedShoe);
    addedShoe.innerHTML = `
    <div class="shoe_image"><img src="./media/skobilder/${shoe.file_name}" alt="Shoes"></div>
    <div class="shoe_info">
        <div class="shoe_name">${shoe.name.toUpperCase()}</div>
        <div class="shoe_size">SIZE ${size}</div>
        <p class="shoe_price">${shoe.price} KR</p> 
        <img src="media/icons/trash_can.png" alt="Remove shoe" class="remove_shoe">
    </div>
    `;

    let removeShoeButton = addedShoe.querySelector(".remove_shoe");
    removeShoeButton.addEventListener("click", function () {
        addedShoe.remove();

        totalPrice -= shoe.price;
        updateTotalPrice(); // Uppdaterar priset när en sko har tagits bort
    });

    updateTotalPrice(); // Uppdaterar skopriset varje gång en sko har lagts till
}

// Funktion som uppdaterar totalpriset
function updateTotalPrice() {
    let totalElement = document.querySelector(".total_price");
    totalElement.textContent = `${totalPrice} KR`;
}