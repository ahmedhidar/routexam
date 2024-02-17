
let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitbtn;

$(document).ready(()=>{
    searchByName("").then($(".loading-screen").fadeOut(500))
    $("body").css("overflow","visible");
    
})

closeSidenav();

function openSidenav (){
    $(".side-nav-menu").animate({left: 0},500);
    $(".open-close").removeClass("fa-bars");
    $(".open-close").addClass("fa-x");
    for(let i = 0;i < 5 ; i++){
        $(".links li").eq(i).animate({top:0},(i+5)*110)
    }
}

function closeSidenav (){
    let tabWidth = $(".side-nav-menu .nav-tab").outerWidth();
    $(".side-nav-menu").animate({left: -tabWidth},500);
    $(".open-close").removeClass("fa-x");
    $(".open-close").addClass("fa-bars");
    $(".links li").animate({top:300},500)
}

$(".side-nav-menu i.open-close").click(()=>{
    console.log()
    
    if ($(".side-nav-menu").css("left") == "0px"){
        closeSidenav()
    }else {
        openSidenav()
    }
})
// ????????????
async function searchByName(word){
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
    response = await response.json();
    response.meals? displayMeals(response.meals): displayMeals([])
    $(".inner-loading-screen").fadeOut(300);
}
async function searchByFirstLetter(letter){
    $(".inner-loading-screen").fadeIn(300);
    letter == "" ? letter = "a":""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json();
    response.meals? displayMeals(response.meals): displayMeals([])
    $(".inner-loading-screen").fadeOut(300);
}



function displayMeals(arr){
    let cartoona = "";
    
    for(let i =0 ; i < arr.length ; i++){
        cartoona += `
        <div class="col-md-3">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
        <img class="w-100" src="${arr[i].strMealThumb}" alt="meal">
        <div class="meal-layer position-absolute d-flex align-items-center justify-content-center p-2">
        <h3 class="text-black">${arr[i].strMeal}</h3>
        </div>
        </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}



async function getCategories(){
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(500);
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json()
    console.log(response)
    displayCategories(response.categories)
}

function displayCategories(arr){
    $(".inner-loading-screen").fadeOut(500)
    let cartoona = "";
    
    for(let i =0 ; i < arr.length ; i++){
        cartoona += `
        <div class="col-md-3">
        <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2">
        <img class="w-100" src="${arr[i].strCategoryThumb}" alt="meal">
        <div class="meal-layer position-absolute text-center p-2">
        <h3 class="text-black">${arr[i].strCategory}</h3>
        <p class="text-black">${arr[i].strCategoryDescription.split(" ").slice(0,15).join(" ")} </p>
        </div>
        </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}

async function getArea(){
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    displayArea(response.meals)
    $(".inner-loading-screen").fadeOut(300);
}
function displayArea(arr){
    cartoona = "";
    for(let i =0 ; i < arr.length ; i++){
        cartoona += `
        <div class="col-md-3">
        <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center">

        <i class="fa-solid fa-4x fa-bowl-food"></i>
        <h3 class="text">${arr[i].strArea}</h3>
        </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}
async function getIngredients(){
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    displayIngredients(response.meals.slice(0,20))
    $(".inner-loading-screen").fadeOut(300);
}
function displayIngredients(arr){
    cartoona = "";
    for(let i =0 ; i < arr.length ; i++){
        cartoona += `
        <div class="col-md-3">
        <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center">

        <i class="fa-solid fa-4x fa-bowl-food"></i>
        <h3 class="text">${arr[i].strIngredient}</h3>
        <p>${arr[i].strDescription.split(" ").slice(0,15).join(" ")}  </p>
        </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}

async function getCategoryMeals(category){
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals.slice(0,20))
    $(".inner-loading-screen").fadeOut(300);
}
async function getAreaMeals(area){
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0,20))
}
async function getIngredientsMeals(Ingredient){
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`)
    response = await response.json()
    displayMeals(response.meals.slice(0,20))
}



async function getMealDetails(id){
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json()
    displayMealDetails(response.meals[0])
    $(".inner-loading-screen").fadeOut(300);
    closeSidenav()
}

function displayMealDetails(meal){
    let ingredient =``;
    for(let i = 1; i<=20;i++){
        if(meal[`strIngredient${i}`]){
            ingredient+=`<li class="alert alert-info m-2 p-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    
    let tags = meal.strTags?.split(",")
    if(!tags)tags =[]
    let tagsStr =``
    for(i = 0; i < tags.length;i++){
        tagsStr = `
        <li class="alert alert-warning m-2 p-2">${tags[i]}</li>
        `
    }


    let cartoona = `        <div class="col-md-4">
    <img class="rounded-3 w-100" src="${meal.strMealThumb}" alt="meal photo">
    <h2>${meal.strMeal}</h2>
</div>
<div class="col-md-8">
    <h2>Instruction</h2>
    <p>${meal.strInstructions}</p>
    <h3><span class="fw-bolder">area:</span>${meal.strArea}</h3>
    <h3><span class="fw-bolder">category:</span>${meal.strCategory}</h3>
    <h3>recipes:</h3>
    <ul class="list-unstyled d-flex flex-wrap">
    ${ingredient}
    </ul>
    <h3>tags:</h3>
    <ul class="list-unstyled d-flex flex-wrap">
    ${tagsStr}
    </ul>
    <a target="_blank" href="${meal.strSource}" class="btn btn-success">sources</a>
    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">youtube</a>
</div>`
rowData.innerHTML = cartoona
}

function showSearchInput(){
    searchContainer.innerHTML = `    <div class="row p-5">
    <div class="col-md-6">
        <input onkeyup="searchByName(this.value)" type="text" class="form-control bg-transparent text-white" placeholder="search by name">
    </div>
    <div class="col-md-6">
        <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" type="text" class="form-control bg-transparent text-white" placeholder="search by letter">
    </div>
</div>`
rowData.innerHTML = ``;
}
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;
function showContacts(){
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-50 text-center">
        <div class="row g-4 p-4">
            <div class="col-md-6">
                <input onkeyup="inputsValidation()" id="nameInput" type="text" class="form-control"  placeholder="enter your name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                special characters and number not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="inputsValidation()" id="emailInput" type="email" class="form-control" placeholder="enter your email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    enter valid email
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="inputsValidation()" id="phoneInput" type="number" class="form-control" placeholder="enter your phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    enter valid number
                    </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="inputsValidation()" id="ageInput" type="number" class="form-control" placeholder="enter your age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    enter valid age
                    </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="inputsValidation()" id="passwordInput" type="password" class="form-control" placeholder="enter your password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    At least one lowercase alphabet i.e. [a-z]
At least one uppercase alphabet i.e. [A-Z]
At least one Numeric digit i.e. [0-9]
At least one special character i.e. [@, $, ., #, !, %, *, ?, &, ^]
Also, the total length must be in the range [8-15]
                    </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="inputsValidation()" id="repasswordInput" type="password" class="form-control" placeholder="confirm your password">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    special characters and number not allowed
                    </div>
            </div>
        </div>
        <button id="submitbtn" disabled class="btn btn-outline-warning px-2 mt-3">submit</button>
    </div>
</div>`
submitbtn =document.getElementById("submitbtn");
document.getElementById("nameInput").addEventListener("focus",()=>{
    nameInputTouched = true;
})
document.getElementById("emailInput").addEventListener("focus",()=>{
    emailInputTouched = true;
})
document.getElementById("nameInput").addEventListener("focus",()=>{
    nameInputTouched = true;
})
document.getElementById("phoneInput").addEventListener("focus",()=>{
    phoneInputTouched = true;
})
document.getElementById("ageInput").addEventListener("focus",()=>{
    ageInputTouched = true;
})
document.getElementById("passwordInput").addEventListener("focus",()=>{
    passwordInputTouched = true;
})
document.getElementById("repasswordInput").addEventListener("focus",()=>{
    repasswordInputTouched = true;
})
}

function inputsValidation(){
    if(nameInputTouched){
    if(nameValidation()){
        document.getElementById("nameAlert").classList.replace("d-block","d-none");
    }else{
        document.getElementById("nameAlert").classList.replace("d-none","d-block");
    }}

    if(emailInputTouched){
    if(emailValidation()){
        document.getElementById("emailAlert").classList.replace("d-block","d-none");
    }else{
        document.getElementById("emailAlert").classList.replace("d-none","d-block");
    }}
    if(phoneInputTouched){
    if(phoneValidation()){
        document.getElementById("phoneAlert").classList.replace("d-block","d-none");
    }else{
        document.getElementById("phoneAlert").classList.replace("d-none","d-block");
    }}
    if(ageInputTouched){
    if(ageValidation()){
        document.getElementById("ageAlert").classList.replace("d-block","d-none");
    }else{
        document.getElementById("ageAlert").classList.replace("d-none","d-block");
    }}
    if(passwordInputTouched){
    if(passwordValidation()){
        document.getElementById("passwordAlert").classList.replace("d-block","d-none");
    }else{
        document.getElementById("passwordAlert").classList.replace("d-none","d-block");
    }}
    if(repasswordInputTouched){
    if(repasswordValidation()){
        document.getElementById("repasswordAlert").classList.replace("d-block","d-none");
    }else{
        document.getElementById("repasswordAlert").classList.replace("d-none","d-block");
    }}

    if(
        nameValidation()&&
        emailValidation()&&
        phoneValidation()&&
        ageValidation()&&
        passwordValidation()&&
        repasswordValidation()
    ){
        console.log("yes");
        submitbtn.removeAttribute("disabled")
    }else{
        submitbtn.setAttribute("disabled",true)
    }
}
function nameValidation(){
    return(/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}
function emailValidation(){
    return(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("emailInput").value))
}
function phoneValidation(){
    return(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}
function ageValidation(){
    return(/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}
function passwordValidation(){
    return(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{7,15}$/.test(document.getElementById("passwordInput").value))
}
function repasswordValidation(){
    return document.getElementById("passwordInput").value == document.getElementById("repasswordInput").value
}