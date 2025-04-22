    const mealsDiv = document.querySelector(".mealsdiv");
const favList = document.querySelector(".favmealsdiv");
const searchInput = document.querySelector(".searchitem");
const searchBtn = document.querySelector(".searchbutt");
const modal = document.querySelector(".detcont");


document.addEventListener("DOMContentLoaded", function () {
getRandomMeal();
updateFavorites();


searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
});
});


async function getRandomMeal() {
try {
    const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await res.json();
    if (data.meals) {
    addMeal(data.meals[0], true);
    }
} catch (error) {
    console.error("Error fetching random meal:", error);
}
}


function addMeal(meal, isRandom) {
const mealEl = document.createElement("div");
mealEl.className = "meal";
mealEl.innerHTML = `
        ${isRandom ? "<h3>Random Recipe</h3>" : ""}
        <div class="mealhead">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        <div class="mealbody">
            <h4>${meal.strMeal}</h4>
            <button class="heart ${
                isFavorite(meal.idMeal) ? "active" : ""
            }">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

const heartBtn = mealEl.querySelector(".heart");
heartBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFavorite(meal);
});

mealEl.addEventListener("click", () => showMealDetails(meal));
mealsDiv.appendChild(mealEl);
}


function toggleFavorite(meal) {
const favorites = getFavorites();
const index = favorites.indexOf(meal.idMeal);

if (index === -1) {
    favorites.push(meal.idMeal);
} else {
    favorites.splice(index, 1);
}

localStorage.setItem("favorites", JSON.stringify(favorites));
updateFavorites();
}


async function updateFavorites() {
favList.innerHTML = "";
const favorites = getFavorites();

if (favorites.length === 0) {
    favList.innerHTML = "<p>No favorites yet</p>";
    return;
}

for (const id of favorites) {
    const meal = await getMealById(id);
    if (meal) addFavorite(meal);
}
}


function addFavorite(meal) {
const favItem = document.createElement("li");
favItem.className = "favitems";
favItem.innerHTML = `
        <div class="favimage">
            <div>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div class="spanwidth">
                <span>${meal.strMeal}</span>
            </div>
            <button class="clear">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

favItem.addEventListener("click", () => showMealDetails(meal));

const clearBtn = favItem.querySelector(".clear");
clearBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeFavorite(meal.idMeal);
});

favList.appendChild(favItem);
}

// Remove favorite
function removeFavorite(id) {
const favorites = getFavorites().filter((mealId) => mealId !== id);
localStorage.setItem("favorites", JSON.stringify(favorites));
updateFavorites();
}


function showMealDetails(meal) {
modal.innerHTML = `
        <div class="details">
            <button class="closebutt">
                <i class="fas fa-times"></i>
            </button>
            <div class="titimg">
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div class="para">
                <p>${meal.strInstructions}</p>
            </div>
        </div>
    `;

modal.classList.toggle("hidden");

const closeBtn = modal.querySelector(".closebutt");
closeBtn.addEventListener("click", () => {
    modal.classList.toggle("hidden");
});


modal.addEventListener("click", (e) => {
    if (e.target === modal) {
    modal.classList.toggle("hidden");
    }
});
}


async function handleSearch() {
const term = searchInput.value.trim();
if (!term) return;

try {
    mealsDiv.innerHTML = "<p>Searching...</p>";
    const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    const data = await res.json();

    mealsDiv.innerHTML = "";

    if (data.meals) {
    data.meals.forEach((meal) => addMeal(meal, false));
    } else {
    mealsDiv.innerHTML = "<p>No meals found</p>";
    }
} catch (error) {
    console.error("Search error:", error);
    mealsDiv.innerHTML = "<p>Error searching meals</p>";
}
}


function getFavorites() {
return JSON.parse(localStorage.getItem("favorites") || "[]");
}

function isFavorite(id) {
return getFavorites().includes(id);
}

async function getMealById(id) {
try {
    const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
} catch (error) {
    console.error("Error fetching meal:", error);
    return null;
}
}
    
