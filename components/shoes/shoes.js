"use strict";

function renderShoes(parent, shoe) {
  const container = document.createElement("div");
  container.classList.add("shoe");
  container.id = shoe.id;
  parent.append(container);

  const countryOfProduction = arrayFind(COUNTRIES, function (x) { return x.id === shoe.country_id; });
  const kindOfShoe = arrayFind(KINDS, function (x) { return x.id === shoe.kind_id; });

  const imagePath = shoe.file_name;

  container.innerHTML = `
      <div>
        <img src="media/skobilder/${imagePath}" alt="Shoes">
        <h1>${shoe.name.toUpperCase()}</h1>
        <div class="price">${shoe.price} KR</div>
        <div class="kindOfShoe">${kindOfShoe.name.toUpperCase()}</div>
        <div class="countryOfProduction">MADE IN ${countryOfProduction.name.toUpperCase()}</div >
      </div >
    `;

  container.addEventListener("click", function () {
    function calculateAverageRating(reviews) {
      const totalScores = reviews.reduce((sum, review) => sum + review.score, 0);
      const averageRating = totalScores / (reviews.length || 1);
      return isNaN(averageRating) ? 0 : averageRating;
    }

    const imagePath = shoe.file_name;

    //Reviews
    const foundReview = REVIEWS.filter((obj) => obj.shoe_id === shoe.id);
    // Skostorlekar
    // Metoden .filter() funkar som array_filter()
    const foundSize = INVENTORY.filter((obj) => obj.shoe_id === shoe.id);

    // declare to calculate the average of the reviews
    const averageRating = calculateAverageRating(foundReview);

    // console.log(KINDS);
    // console.log(kindOfShoe);

    const popup = document.createElement("div");
    popup.innerHTML = `
      <div id="popup">
        <div class="popupContainer">
          <div id="closeButton">x</div>
          <div class="content">
            <img src="media/skobilder/${imagePath}" alt="Shoes">
            <div>
              <h1>${shoe.name.toUpperCase()}</h1>
              <div class="price">${shoe.price} KR</div>
              <div class="productdetails">
                <div class="kindOfShoe">${kindOfShoe.name.toUpperCase()}</div>
                <div class="countryOfProduction">MADE IN ${countryOfProduction.name.toUpperCase()}</div>
              </div>
              <div>
                <h2>SIZES</h2>
              </div>
              <div class="sizes">${renderSize(foundSize)}</div>
              <div class="addToCartButton">
                <p>ADD TO CART</p>
              </div>
            </div>           
          </div>
          
          <div id="reviews">
            <div>
              <h2 id="reviewh1">REVIEWS</h2>
              <div id="stars">
                ${renderStarRatings(averageRating)} (${foundReview.length})
              </div>
            </div>
            <div id="comment">
              ${renderComments(foundReview)}
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(popup);

    /* Renderar storlekarna och kontrollerar dess saldo
Tar emot en parameter, inventory, som är skon */
    function renderSize(inventory) {
      // .map() skapar en ny array, alltså modifierar inte den originella arrayen,
      // genom att kalla på en funktion på varje element i arrayen
      // sizesHTML är alltså en array
      const sizesHTML = inventory.map((inventoryItem) => {
        // n_shoes finns i INVENTORY i "database.js"
        const isAvailable = inventoryItem.n_shoes > 0; // Kontrollerar om skon finns i saldo

        let sizeClass; // Deklarerar en klass som ska kontrollera om skon finns i saldo
        if (isAvailable) {
          sizeClass = ""; // Skon finns i saldo, så klassen blir tom
        } else {
          sizeClass = "unavailable-size"; // Finns inte skon får den en klass
        }

        let sizeContent; // Deklarerar som kontrollerar hur skon ska synas på hemsidan, om den finns eller inte
        if (isAvailable) {
          sizeContent = inventoryItem.size; // Ska renderas som vanligt om den finns
        } else {
          // Om den inte finns i saldo, ska vi styla boxen annorlunda för att indikera
          // att den inte finns
          sizeContent = `<div class="unavailable-x"></div>${inventoryItem.size}`;
        }

        return `
        <div class="size-box ${sizeClass}">
          <p class="choose">${sizeContent}</p>
        </div>
      `;
      }).join("");
      // .join("") tar bort kommateckena eftersom sizesHTML är en array som vi beskrev
      // Konverterar vi arrayen till en sträng kommer kommateckena att komma med
      // konverteringen
      // T.ex. const fruits = ["Banana", "Orange", "Apple", "Mango"];
      //       let text = fruits.join(" and ");
      // =>    Banana and Orange and Apple and Mango
      // Istället för Banana, Orange, Apple, Mango

      return sizesHTML;
    }

    // Selekterar "add to cart"-button för att kunna lägga till
    // en event listener
    const addToCartButton = popup.querySelector(".addToCartButton");

    addToCartButton.addEventListener("click", function () {
      // Funktion anropas som hanterar val av skor
      const selectedSize = getSelectedSize();
      let selectedShoe = arrayFind(SHOES, function (object) {
        return shoe.id == object.id;
      })

      console.log(selectedShoe);
      // Funktion anropas som kontrollerar om skon finns i saldo
      // Returnerar true eller false
      const isInStock = checkStockAvailability(selectedShoe, selectedSize);

      if (isInStock) {
        addToCart(selectedShoe, selectedSize);
        alert("Your shoe was successfully added to the cart!");
      } else {
        // alert() ger oss ett meddelande
        alert("Selected size is not in stock. Please choose another size.");
      }
    });

    // Funktionen hanterar val av storlek
    // Anropas i addToCartButton, selectedSize
    function getSelectedSize() {
      // const sizeContainer = document.querySelector(".size-box");
      const selectedSizeElement = document.querySelector(".selected_shoe");

      // if selectedSizeElement är true, returnera textContent
      // annars returnera null
      // .trim() för att ta bort all space
      return selectedSizeElement ? selectedSizeElement.textContent.trim() : null;
    }

    // Funktion som kontrollerar om skon finns i saldo
    // Anropas i addToCartButton, isInStock
    function checkStockAvailability(selectedShoe, selectedSize) {
      // Implement your logic to check if the selected size is in stock
      // For example, you might have an array of available sizes for the shoe
      const availableSizes = INVENTORY
        .filter(sizeObject => sizeObject.shoe_id === selectedShoe.id && sizeObject.n_shoes > 0)
        .map(sizeObject => sizeObject.size);
      console.log(availableSizes);
      // True eller false
      return availableSizes.includes(Number(selectedSize));
    }

    // X-knappen, tar bort popup-fönstret
    const closeButton = popup.querySelector("#closeButton");
    closeButton.addEventListener("click", function () {
      popup.remove();
    });

    //choose the size and change the background color
    const sizeBoxes = document.querySelectorAll(".size-box");

    sizeBoxes.forEach(function (sizeBox) {
      sizeBox.addEventListener("click", function () {

        sizeBoxes.forEach(function (box) {
          box.classList.remove("selected_shoe");
        });

        sizeBox.classList.add("selected_shoe");
      });
    });

  })

  //show the comment on the shoes
  function renderComments(reviews) {
    return reviews.map((review) => `
    <div class="comment">
      <div class="review-info">
        <hp>
          <span class="reviewer-name">Anonym on</span>
          <span class="review-date">12/12/2023</span>
        </hp>
        <div class="stars">
          ${renderStarRatings(review.score)}
        </div>
      </div>
      <div class="review-content">
        <p>${review.rev}</p>
      </div>
    </div>
  `).join("");
  }


  function renderStarRatings(score) {
    const totalStars = 5;
    const filledStars = Math.round(score);

    return Array.from({ length: totalStars }, (_, index) => {
      const isFilled = index < filledStars;
      const starStyle = isFilled ? 'filled-star' : 'empty-star';
      return `<span class="star ${starStyle}">&#9733;</span>`;
    }).join("");
  }
}

