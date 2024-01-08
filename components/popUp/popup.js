// "use strict"

// // Körs när alla element och komponenter laddats
// document.addEventListener("DOMContentLoaded", function () {
//   // Funktion som räknar ut genomsnittligt betyg
//   function calculateAverageRating(reviews) {
//     // .reduce()-metoden gör om en array till ett värde
//     // Tar emot två parametrar; en funktion, och ett startvärde
//     const totalScores = reviews.reduce((sum, review) => sum + review.score, 0);
//     // Räknar ut genomsnittliga betyget
//     // Totala betyget delat på antal betyg
//     // "|| 1" för om reviews.length = 0 blir det undefined,
//     // går inte att dela på 0
//     const averageRating = totalScores / (reviews.length || 1);

//     // Om averageRating är Not A Number returneras 0
//     // Annars returneras genomsnittliga betyget
//     return isNaN(averageRating) ? 0 : averageRating;
//   }

//   function renderPopup(shoe) {
//     const imagePath = shoe.file_name;

//     // Filtrerar efter rätt recensioner till skon
//     const foundReview = REVIEWS.filter((obj) => obj.shoe_id === shoe.id);

//     // Genomsnittliga betyget
//     const averageRating = calculateAverageRating(foundReview);

//     const countryOfProduction = COUNTRIES.find(function (x) { return x.id === shoe.country_id; });
//     const kindOfShoe = KINDS.find(function (x) { return x.id === shoe.kind_id; });

//     const popup = document.createElement("div");
//     popup.innerHTML = `
//       <div id="popup">
//         <div class="popupContainer">
//           <div id="closeButton">X</div>
//           <div class="content">
//             <img src="media/skobilder/${imagePath}" alt="Shoes">
//             <div>
//               <h1>${shoe.name.toUpperCase()}</h1>
//               <div class="price">${shoe.price} KR</div>
//               <div class="productdetails">
//                 <div class="kindOfShoe">${kindOfShoe.name.toUpperCase()}</div>
//                 <div class="countryOfProduction">MADE IN ${countryOfProduction.name.toUpperCase()}</div>
//               </div>
//             </div>           
//           </div>
        
          
//           <div id="reviews">
//             <div>
//               <h2 id="reviewh1">REVIEWS</h2>
//               <div id="stars">
//                 ${renderStarRatings(averageRating)} (${foundReview.length})
//               </div>
//             </div>
//             <div id="comment">
//               ${renderComments(foundReview)}
//             </div>
//           </div>
//         </div>
//       </div>
//     `;

//     document.body.appendChild(popup);

//     const closeButton = popup.querySelector("#closeButton");
//     closeButton.addEventListener("click", function () {
//       popup.remove();
//     });
//   }

//   function renderComments(reviews) {
//     // Modifierar arrayen så att varje element ska innehålla detta
//     // Till för DOM
//     return reviews.map((review) => `
//     <div class="comment">
//       <div class="review-info">
//         <hp>
//           <span class="reviewer-name">Anonym on</span>
//           <span class="review-date">12/12/2023</span>
//         </hp>
//         <div class="stars">
//           ${renderStarRatings(review.score)}
//         </div>
//       </div>
//       <div class="review-content">
//         <p>${review.rev}</p>
//       </div>
//     </div>
//   `);
//   }

//   // Anropas i renderComments()
//   function renderStarRatings(score) {
//     const totalStars = 5; // max = 5
//     const filledStars = Math.round(score); // Math.round avrundar till närmsta heltal

//     // Array.from() skapar en array av strängar eller siffror
//     // Syntax: Array.from(object, mapFunction, thisValue)

//     // (_, index) är funktion som mappar alla element i arrayen
//     // Syntax: array.map(function(currentValue, index, arr), thisValue)

//     // length: 5 på arrayen
//     return Array.from({ length: totalStars }, (_, index) => {
//       const isFilled = index < filledStars; // true eller false
//       const starStyle = isFilled ? "filled-star" : "empty-star";
//       // Om stjärnan ska svara svart eller grå
//       return `<span class="star ${starStyle}">&#9733;</span>`;
//     });
//   }

// });