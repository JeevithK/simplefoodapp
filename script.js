// let mealsdiv = document.querySelector(".mealsdiv");
// let favcontbox = document.querySelector(".favcont");
// let ulbox = document.querySelector(".favmealsdiv");

// const searchitem = document.querySelector(".searchitem");
// const searchbutt = document.querySelector(".searchbutt");

// const detinfo=document.querySelector(".detcont");

// let closeinfo=document.querySelector(".closebutt"); 

// let detinfopop=document.getElementById("detcont");

// getrand();  
// fetchfavmeals();

// async function getrand() {
//     let meals = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
//     let resp = await meals.json();
//     console.log(resp);
//     selectandsave(resp);
// }

// function selectandsave(fmeals) {
//     if (!fmeals || !fmeals.meals || !fmeals.meals[0]) {
//         console.error('Invalid meal data:', fmeals);
//         return;
//     }

    

//     let newdiv = document.createElement("div");
//     newdiv.className = "meal";
//     newdiv.innerHTML = `<h3>Random Recipe</h3>
//                 <div class="mealhead">
//                     <img src="${fmeals.meals[0].strMealThumb}" alt="">
//                 </div>
//                 <div class="mealbody">
//                     <h4>${fmeals.meals[0].strMeal}</h4>
//                     <button class="heart">
//                         <i class="fa-solid fa-heart" id="heartbutt"></i>
//                     </button>
//                 </div>`;
    
//     mealsdiv.append(newdiv);

//     // Attach the event listener to the newly created heart button
//     const heart = newdiv.querySelector(".mealbody .heart");
    
//     heart.addEventListener("click", () => {
//         heart.classList.toggle("active");
//         if (heart.classList.contains("active")) {
//             addeletols(fmeals);    
//         } else {
//             removefromls(fmeals.meals[0].idMeal);
//         }
//         fetchfavmeals();
//     });




// }
 

// function addeletols(meals) {
//     let mealid = JSON.parse(localStorage.getItem("mealIds") || "[]");
//     mealid.push(meals.meals[0].idMeal);
//     localStorage.setItem("mealIds", JSON.stringify(mealid));
//     console.log(JSON.parse(localStorage.getItem("mealIds")));
// }

// function removefromls(mealids) {
//     let mealid = JSON.parse(localStorage.getItem("mealIds") || "[]");
//     localStorage.setItem("mealIds", JSON.stringify(mealid.filter((id) => id !== mealids)));
// }

// async function getmealbyid(id) {
//     const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
//     const respdata = await resp.json();
//     const meal = respdata.meals[0];
//     return meal;
// }

// async function fetchfavmeals() {
//     ulbox.innerHTML = ""; 
//     const mealids = JSON.parse(localStorage.getItem("mealIds")) || [];
//     const meals = [];

//     for (let i = 0; i < mealids.length; i++) {
//         const mealid = mealids[i];
//         let meal = await getmealbyid(mealid);
//         meals.push(meal); 
//         addmealtofav(meal);
//     }
//     console.log(meals);
// }

// function addmealtofav(fmeals) {
//     let newli = document.createElement("li");
//     newli.className = "favitems";
//     newli.innerHTML = `
//                 <div class="favimage">
//                     <div>
//                         <img src="${fmeals.strMealThumb}" alt="">
//                     </div>
//                     <div class="spanwidth">
//                         <span>${fmeals.strMeal}</span>
//                     </div>
//                     <button class="clear">
//                         <i id="cross" class="fa-solid fa-circle-xmark"></i>
//                     </button>
//                 </div>`;
    
//     ulbox.append(newli);      
    
//     newli.addEventListener("click",()=>
//         {
//             showitem(fmeals);
//         })

//     let cross = newli.querySelector(".clear");

//     cross.addEventListener("click", () => {
//         removefromls(fmeals.idMeal);
//         fetchfavmeals();
//     });

//     let det=newli.querySelector(".details");
// //     document.addEventListener("click", (event) => {
// //     // Check if the clicked element has the class 'favimage'
// //     if (event.target.closest(".favimage")) {
// //         det.style.visibility = "visible";
// //     }
// // });

// }

// async function getmealsbysearch(it) {

//     const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + encodeURIComponent(it));
//     const respdata = await resp.json();
//     return respdata.meals;
// }

// searchbutt.addEventListener("click", async () => {
//     favcontbox.innerHTML="";
//     const search = searchitem.value;
//     const meals = await getmealsbysearch(search);

//     if (Array.isArray(meals)) {
//         if (meals.length === 0) {
//             console.log('No meals found.');
//             return;
//         }
//         meals.forEach((element) => {
//             selectandsave({ meals: [element] });
//         });
//     } else {
//         console.error('Invalid meals data:', meals);
//     }
// });






// function showitem(mealdata)
// {
//     detinfo.innerHTML="";
//     let newdiv=document.createElement("div");

//     newdiv.className="details";

//     newdiv.innerHTML=`<button class="closebutt"><i id="cross2" class="fa-solid fa-circle-xmark"></i></button>
//                 <div class="titimg">
                
//                     <h2 style="margin-top: 6 0px;">${mealdata.strMeal}</h2>
//                     <img src="${mealdata.strMealThumb}" alt="">
//                 </div> 
//                 <div class="para">
//                     <p class="ptag"> 
//                    ${mealdata.strInstructions}
//                     </p>
//                 </div>
//             `
//     detinfo.classList.remove("hidden");

//     detinfo.append(newdiv);
//     let closeinfo=document.querySelector(" .closebutt"); 

//     closeinfo.addEventListener("click",()=>
//         {
//             detinfo.classList.add("hidden");
//         })

// }

// Select elements
let mealsdiv = document.querySelector(".mealsdiv");
let favcontbox = document.querySelector(".favcont");
let ulbox = document.querySelector(".favmealsdiv");

const searchitem = document.querySelector(".searchitem");
const searchbutt = document.querySelector(".searchbutt");

const detinfo = document.querySelector(".detcont");

let closeinfo = document.querySelector(".closebutt");

// Initial fetch
getrand();  
fetchfavmeals();

async function getrand() {
    let meals = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    let resp = await meals.json();
    console.log(resp);
    selectandsave(resp);
}

function selectandsave(fmeals) {
    if (!fmeals || !fmeals.meals || !fmeals.meals[0]) {
        console.error('Invalid meal data:', fmeals);
        return;
    }

    let newdiv = document.createElement("div");
    newdiv.className = "meal";
    newdiv.innerHTML = `<h3>Random Recipe</h3>
                <div class="mealhead">
                    <img src="${fmeals.meals[0].strMealThumb}" alt="">
                </div>
                <div class="mealbody">
                    <h4>${fmeals.meals[0].strMeal}</h4>
                    <button class="heart">
                        <i class="fa-solid fa-heart" id="heartbutt"></i>
                    </button>
                </div>`;
    
    mealsdiv.append(newdiv);

    // Attach the event listener to the newly created heart button
    const heart = newdiv.querySelector(".mealbody .heart");
    
    heart.addEventListener("click", () => {
        heart.classList.toggle("active");
        if (heart.classList.contains("active")) {
            addeletols(fmeals);    
        } else {
            removefromls(fmeals.meals[0].idMeal);
        }
        fetchfavmeals();
    });
}

function addeletols(meals) {
    let mealid = JSON.parse(localStorage.getItem("mealIds") || "[]");
    mealid.push(meals.meals[0].idMeal);
    localStorage.setItem("mealIds", JSON.stringify(mealid));
    console.log(JSON.parse(localStorage.getItem("mealIds")));
}

function removefromls(mealids) {
    let mealid = JSON.parse(localStorage.getItem("mealIds") || "[]");
    localStorage.setItem("mealIds", JSON.stringify(mealid.filter((id) => id !== mealids)));
}

async function getmealbyid(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const respdata = await resp.json();
    const meal = respdata.meals[0];
    return meal;
}

async function fetchfavmeals() {
    ulbox.innerHTML = ""; 
    const mealids = JSON.parse(localStorage.getItem("mealIds")) || [];
    const meals = [];

    for (let i = 0; i < mealids.length; i++) {
        const mealid = mealids[i];
        let meal = await getmealbyid(mealid);
        meals.push(meal); 
        addmealtofav(meal);
    }
    console.log(meals);
}

function addmealtofav(fmeals) {
    let newli = document.createElement("li");
    newli.className = "favitems";
    newli.innerHTML = `
                <div class="favimage">
                    <div>
                        <img src="${fmeals.strMealThumb}" alt="">
                    </div>
                    <div class="spanwidth">
                        <span>${fmeals.strMeal}</span>
                    </div>
                    <button class="clear">
                        <i id="cross" class="fa-solid fa-circle-xmark"></i>
                    </button>
                </div>`;
    
    ulbox.append(newli);      
    
    newli.addEventListener("click",() => {
        showitem(fmeals);
    });

    let cross = newli.querySelector(".clear");

    cross.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent event from bubbling up to the parent li
        removefromls(fmeals.idMeal);
        fetchfavmeals();
    });
}

async function getmealsbysearch(it) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + encodeURIComponent(it));
    const respdata = await resp.json();
    return respdata.meals;
}

searchbutt.addEventListener("click", async () => {
    mealsdiv.innerHTML = ""; // Clear previous search results
    const search = searchitem.value;
    const meals = await getmealsbysearch(search);

    if (Array.isArray(meals)) {
        if (meals.length === 0) {
            console.log('No meals found.');
            return;
        }
        meals.forEach((element) => {
            selectandsave({ meals: [element] });
        });
    } else {
        console.error('Invalid meals data:', meals);
    }
});

function showitem(mealdata) {
    detinfo.innerHTML = "";
    let newdiv = document.createElement("div");

    newdiv.className = "details";

    newdiv.innerHTML = `<button class="closebutt"><i id="cross2" class="fa-solid fa-circle-xmark"></i></button>
                <div class="titimg">
                    <h2>${mealdata.strMeal}</h2>
                    <img src="${mealdata.strMealThumb}" alt="">
                </div> 
                <div class="para">
                    <p class="ptag"> 
                   ${mealdata.strInstructions}
                    </p>
                </div>
            `;
    detinfo.classList.remove("hidden");
    detinfo.append(newdiv);
    
    let closeinfo = document.querySelector(".closebutt");

    closeinfo.addEventListener("click", () => {
        detinfo.classList.add("hidden");
    });
}
