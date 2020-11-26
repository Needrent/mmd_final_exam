"use strict";
/******
    Variables
******/
const linkProdukt = "http://kontrolpanel.johannesantiksalg.dk/wp-json/wp/v2/produkt?_embed";
const linkInfo = "http://kontrolpanel.johannesantiksalg.dk/wp-json/wp/v2/information";
const linkEmployees = "http://kontrolpanel.johannesantiksalg.dk/wp-json/wp/v2/medarbejder?_embed";

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
function showProdukts(data){
    data.forEach(produkt => {
        console.log(produkt);
    });
}
function showInfo(data){
        console.log(data);
}
function showEmployees(data){
    data.forEach(employee => {
        console.log(employee);
    });
}

/******
    Run fetch links
******/
loadProducts(linkProdukt);
loadInfo(linkInfo);
loadEmployees(linkEmployees);