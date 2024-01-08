// Vill ha clickedShoeArray som global variabel för att kunna inegrera med de andra
// filtrerna
let clickedShoeArray = SHOES;

// types = KINDS från database.js
function renderNavShoeKinds(parent, types) {

    // Skapar en div med texten "ALL"
    const textAll = document.createElement("div");
    textAll.innerText = "ALL";

    // Ger den klasserna "all" & "h_class"
    textAll.classList.add("all");
    textAll.classList.add("h_class");
    textAll.id = "0";

    // Lägger till den i navbaren
    parent.appendChild(textAll);

    // När man trycker på texten "ALL" anropas funktioner som uppdaterar sko listan
    textAll.addEventListener("click", function () {
        // Defaultvärden på filter och sortering
        const options = document.querySelector("#sort_by");
        options.value = "";
        const price = document.querySelector(".input-price");
        price.value = 2000;
        options.value = "";
        const checkbox = document.querySelectorAll(".country-box");
        for (let i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = false;
        }

        // Default
        updateShoeList(SHOES);
    });;

    for (let type of types) {
        // I databasen heter slippers tofflor
        if (type.name == "Tofflor") {
            const text = document.createElement("div");
            text.innerText = "SLIPPERS";

            text.classList.add("h_class");
            text.classList.add("slippers");
            text.id = type.id;

            parent.appendChild(text);

            text.addEventListener("click", function (event) {
                // Defaultvärden på filter och sortering
                const options = document.querySelector("#sort_by");
                options.value = "";
                const price = document.querySelector(".input-price");
                price.value = 2000;
                const checkbox = document.querySelectorAll(".country-box");
                for (let i = 0; i < checkbox.length; i++) {
                    checkbox[i].checked = false;
                }

                clickedShoeArray = array_filter(SHOES, function (obj) {
                    return obj.kind_id == event.target.id;
                });
                renderShoeList(structureContainers.bottom, clickedShoeArray);
            });
        } else {
            const text = document.createElement("div");
            text.innerText = type.name.toUpperCase();


            text.classList.add("h_class");
            text.classList.add(type.name.toLowerCase());
            text.id = type.id;

            parent.appendChild(text);

            text.addEventListener("click", function (event) {
                // Defaultvärden på filter och sortering
                const options = document.querySelector("#sort_by");
                options.value = "";
                const price = document.querySelector(".input-price");
                price.value = 2000;
                const checkbox = document.querySelectorAll(".country-box");
                for (let i = 0; i < checkbox.length; i++) {
                    checkbox[i].checked = false;
                }
                // Skapar en ny array med skor som endast är den typen användaren klickar på
                clickedShoeArray = array_filter(SHOES, function (obj) {
                    // Event.target.id är id:et från den diven(typen) användaren tryckte på
                    return obj.kind_id == event.target.id;
                });
                // Anropar funktionen som uppdaterar listan
                renderShoeList(structureContainers.bottom, clickedShoeArray);
            });
        }
    }
}