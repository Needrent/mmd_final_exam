"use strict";

/******
    Menu Animation
******/
const menuBtn = document.querySelector("label[for='mobilenav']");
const menuItems = document.querySelectorAll("label[for='mobilenav'] span");
const menuSlider = document.querySelector("#topMenu");

menuBtn.addEventListener("click", ()=>{

    menuItems[0].classList.toggle("aniMenuTop");
    menuItems[1].classList.toggle("aniMenuCenter");
    menuItems[2].classList.toggle("aniMenuBottom");

    menuSlider.classList.toggle("menuIn");
})

/******
    Fetch Variables
******/
const linkProdukt = "http://kontrolpanel.johannesantiksalg.dk/wp-json/wp/v2/produkt?_embed";
const linkInfo = "http://kontrolpanel.johannesantiksalg.dk/wp-json/wp/v2/information";
const linkEmployees = "http://kontrolpanel.johannesantiksalg.dk/wp-json/wp/v2/medarbejder?_embed";

/******
    Variables
******/
// Opening hours
const openDays01 = document.querySelector("#open01");
const openHours01 = document.querySelector("#hours01");
const openDays02 = document.querySelector("#open02");
const openHours02 = document.querySelector("#hours02");

//console.log(open);

/******
    Fetch data
******/
function loadProducts(link) {
    fetch(link).then(e => e.json()).then(data => showProdukts(data));
}
function loadInfo(link) {
    fetch(link).then(e => e.json()).then(data => showInfo(data));
}
function loadEmployees(link) {
    fetch(link).then(e => e.json()).then(data => showEmployees(data));
}

/******
    Use data (funtions)
******/
/*
const modalDescription = document.querySelector("#modalDescription");
const modalPrice = document.querySelector("#modalPrice");
const modalAltPrice = document.querySelector("#modalAltPrice");
const modalInfo = document.querySelector("#modalInfo");
const modalHref = document.querySelector("#modalHref");

console.log(modalTitle);
console.log(modalDescription);
console.log(modalPrice);
console.log(modalAltPrice);
console.log(modalInfo);
console.log(modalHref);*/
const template = document.querySelector("template").content;

function showProdukts(data){
    data.forEach(produkt => {
        //console.log(produkt);
        document.querySelector("#modalAltPrice").classList.add("hide");

         // Image
         document.querySelector("#modal img").src = produkt._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
         document.querySelector("#modal img").alt = produkt._embedded["wp:featuredmedia"][0].alt_text;
        
        //Modal content
        console.log("MODALE");
        document.querySelector("#modalTitle").textContent = produkt.title.rendered;
        document.querySelector("#modalDescription").innerHTML = produkt.content.rendered;
        document.querySelector("#modalHref").href = produkt.ig_link;

        // Vare information
        const wholeCatalogInfo =  produkt.vare_information.split("\n");
        console.log(wholeCatalogInfo);

            //insert designer to list (Vare information)
            wholeCatalogInfo.push(produkt._embedded["wp:term"][0][0].name)

            wholeCatalogInfo.forEach(catalogInfo => {
                let newLi = document.createElement("li");

                newLi.textContent = catalogInfo;
                console.log(catalogInfo);     

                document.querySelector("#modalInfo").appendChild(newLi);
            });


            // Price
            document.querySelector("#modalPrice").textContent = parseInt(produkt.price);
            if(produkt.alt_price != "")
            {
                const newPrice = parseInt(produkt.price) + parseInt(produkt.alt_price);
                console.log(newPrice);
                document.querySelector("#modalAltPrice").classList.remove("hide");
                document.querySelector("#modalAltPrice").textContent = `(${newPrice} kr inkl. ${produkt.extra})`;
            }
    });
}
function showInfo(data){
        // set up data for HTML
        console.log(data[0].facetime);
        console.log(data[0].phone);
        console.log(data[0].cvr);

        // Split adress Farevejle to two lines
        const adressFarevejle =  data[0].farevejle_adress.split(", ");
        console.log(adressFarevejle[0]);
        console.log(adressFarevejle[1]);

        // Split adress Gislinge to two lines
        const adressGislinge =  data[0].gislinge_adress.split(", ");
        console.log(adressGislinge[0]);
        console.log(adressGislinge[1]);

        // Openings Hours
        openDays01.textContent = data[0].open_days01;
        openHours01.textContent = data[0].open_hours01a + " – " + data[0].open_hours01b;
        if(data[0].open_days02 != "")
            {
                openDays02.textContent = data[0].open_days02;
                openHours02.textContent = data[0].open_hours02a + " – " + data[0].open_hours02b;
            }
}
function showEmployees(data){
    data.forEach(employee => {
        //console.log(employee);
        // About
        console.log(employee.title.rendered);
        console.log(employee.content.rendered);

        // Image
        console.log(employee._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url);
        console.log(employee._embedded["wp:featuredmedia"][0].alt_text);
    });
}

/******
    Run fetch links
******/
loadProducts(linkProdukt);
loadInfo(linkInfo);
loadEmployees(linkEmployees);

