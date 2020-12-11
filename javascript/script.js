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
const templateProduct = document.querySelector("#templateProduct").content;
const modal =  document.querySelector("#modal");

        // hide alt price in modal
        document.querySelector("#modalAltPrice").classList.add("hide");

function showProdukts(data){
    // newest post in focus
    const sortData = data.reverse();
    
    sortData.forEach(produkt => {
        console.log(produkt);
        //Creating the products
        const clone = templateProduct.cloneNode(true);

        clone.querySelector("img").src = produkt._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        clone.querySelector("img").alt = produkt._embedded["wp:featuredmedia"][0].alt_text;

        // Creating the modal button
        let button = clone.querySelector(".more");

        // Add click event to image to open modal
        button.addEventListener("click", function(){
            modal.classList.remove("hide");
            document.querySelector("div .close").addEventListener("click",()=>{
                modal.classList.add("hide");
            });

            // Image
            document.querySelector("#modal img").src = produkt._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
            document.querySelector("#modal img").alt = produkt._embedded["wp:featuredmedia"][0].alt_text;
        
            //Modal content
            document.querySelector("#modalTitle").textContent = produkt.title.rendered;
            document.querySelector("#modalDescription").innerHTML = produkt.content.rendered;
            document.querySelector("#modalHref").href = produkt.ig_link;

            // Vare information
            const wholeCatalogInfo =  produkt.vare_information.split("\n");
            console.log(wholeCatalogInfo);

            // clear the list
            document.querySelector("#modalInfo").textContent = "";

                //insert designer to list (Vare information)
                wholeCatalogInfo.push(produkt._embedded["wp:term"][0][0].name);

                wholeCatalogInfo.forEach(catalogInfo => {
                    let newLi = document.createElement("li");

                    newLi.textContent = catalogInfo;
                    console.log(catalogInfo);     

                    document.querySelector("#modalInfo").appendChild(newLi);
                });

                // Price
                document.querySelector("#modalPrice").textContent = parseInt(produkt.price) + " kr";
                if(produkt.alt_price != "")
                {
                    const newPrice = parseInt(produkt.price) + parseInt(produkt.alt_price);
                    console.log(newPrice);
                    document.querySelector("#modalAltPrice").classList.remove("hide");
                    document.querySelector("#modalAltPrice").textContent = `(${newPrice} kr inkl. ${produkt.extra})`;
                }
                else{
                    document.querySelector("#modalAltPrice").classList.add("hide");
                }
        })
            //Append to DOM
            document.querySelector("#produktContainer").appendChild(clone);
    });
}
function showInfo(data){
        // set up data for HTML
        console.log(data[0].facetime);
        console.log(data[0].phone);
        document.querySelector("#cvr").textContent = `CVR.: ${data[0].cvr}`;

        // Split adress Farevejle to two lines
        const adressFarevejle =  data[0].farevejle_adress.split(", ");
        document.querySelector("#farevejleAdress").textContent = adressFarevejle[0];
        document.querySelector("#farevejleCity").textContent = adressFarevejle[1];
        console.log(adressFarevejle[1]);

        // Split adress Gislinge to two lines
        const adressGislinge =  data[0].gislinge_adress.split(", ");
        document.querySelector("#gislingeAdress").textContent = adressGislinge[0];
        document.querySelector("#gislingeCity").textContent = adressGislinge[1];

        // Openings Hours
        openDays01.textContent = data[0].open_days01;
        openHours01.textContent = data[0].open_hours01a + " – " + data[0].open_hours01b;
        if(data[0].open_days02 != "")
            {
                openDays02.textContent = data[0].open_days02;
                openHours02.textContent = data[0].open_hours02a + " – " + data[0].open_hours02b;
                document.querySelector("#callHours").textContent = 
                `(${data[0].open_days01} ${data[0].open_hours01a} til ${data[0].open_hours01b} og 
                    ${data[0].open_days02} ${data[0].open_hours02a} til ${data[0].open_hours02b})`;
            }
            else{
                document.querySelector("#callHours").textContent = 
                `(${data[0].open_days01} ${data[0].open_hours01a} til ${data[0].open_hours01b})`;
            }
}
const employeetemplate = document.querySelector("#employeetemplate").content;

function showEmployees(data){
    data.forEach(employee => {
        const clone = employeetemplate.cloneNode(true);

        // About
        clone.querySelector("h3").textContent = employee.title.rendered;
        clone.querySelector(".content").innerHTML = employee.content.rendered;

        // Image
        clone.querySelector("img").src = employee._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        console.log(employee._embedded["wp:featuredmedia"][0].alt_text);

        document.querySelector("#employeeContainer").appendChild(clone);
    });
}
/******
    Run fetch links
******/
loadProducts(linkProdukt);
loadInfo(linkInfo);
loadEmployees(linkEmployees);