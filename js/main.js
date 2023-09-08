// Decliration Variable
let mealsDiv = document.querySelector(".meals");
let buttonsGetMeal;
let nameOfMeal = document.getElementById("name");
let area = document.getElementById("area");
let instructions = document.getElementById("instructions");
let imagMeal = document.getElementById("imag-meal");
let youtubeMeal = document.getElementById("youtube-meal");
let aboutMeal = document.querySelector(".about-meal");
let closeAboutMeal = document.getElementById("close");
let input = document.getElementById("input-meal");
let inputButton = document.getElementById("input-button");
let noResulte = document.getElementById("no-res");
// Close The About Meal When Click On Close Span
closeAboutMeal.onclick = () => {
  aboutMeal.style.display = "none";
};
// Function To Get All Meals By Api Using Input Value In Search Div
function getMeals() {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
      if (data.meals == null) {
        mealsDiv.innerHTML = "";
        noResulte.innerHTML = `No Resultes For {${input.value.toUpperCase()}}`;
        noResulte.style.display = "block";
        input.value = "";
      } else {
        noResulte.style.display = "none";
        createMeal(data.meals);
      }
    });
}
// Get Details About Specific Meal Uisng Its ID
function getMealDetailsFun(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      updateDetails(data.meals[0]);
    });
}
// Update Details In About Meal Div After Get Data from getMealDetails() function
function updateDetails(date) {
  nameOfMeal.innerHTML = date.strMeal;
  area.innerHTML = date.strArea;
  instructions.innerHTML = date.strInstructions;
  imagMeal.src = date.strMealThumb;
  youtubeMeal.href = date.strYoutube;
  aboutMeal.style.display = "flex";
}
// Create All Meals (DATA) That Get from Api Using getMeals() Function
function createMeal(meals) {
  input.value = "";
  let htmlMealscontent = ``;
  meals.forEach((element) => {
    htmlMealscontent += `<div class="meal">
            <img src="${element.strMealThumb}" alt="" />
            <p>${element.strMeal}</p>
            <button class="get-meal" id="${element.idMeal}">get Recipe</button>
          </div>`;
  });
  buttonsGetMeal = document.querySelectorAll(".get-meal");
  mealsDiv.innerHTML = htmlMealscontent;
}
// Select The Button That Get Id for Specific Meal
function getMealDetails(e) {
  if (e.target.className == "get-meal") {
    getMealDetailsFun(e.target.id);
  }
}
// Statrt Run The Code
inputButton.onclick = function () {
  if (input.value != "") getMeals();
};

document.addEventListener("click", getMealDetails);
