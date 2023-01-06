let personName = document.querySelector("#name");
let personWeight = document.querySelector("#weight");  
let personHeight = document.querySelector("#height");
let personAge = document.querySelector("#age");
 let femaleUser = document.querySelector("#F_gender");
let maleUser = document.querySelector("#M_gender");
let answer = document.querySelector("#btn");
let activityIsLight = document.querySelector("#ActivityLow");
let activityIsModerate = document.querySelector("#ActivityMid");
let activityIsHigh = document.querySelector("#ActivityHigh");
const menuCard = document.querySelector(".dummy-meal");
const ingredientContainer = document.querySelector(".ingredientContainer");

function CalculateBmi() {
    let bmr;
    let calories;
    let name = personName.value;
    let weight = parseInt(personWeight.value);
    let height = parseInt(personHeight.value);
    let age = parseInt(personAge.value);
     // for women
    
    if (femaleUser) {
        bmr = (655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)).toFixed(2);
    }
    // for men
     if(maleUser) { 
     bmr = (66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)).toFixed(2); 
        console.log(bmr);
    }
     if (activityIsLight.value ==="Light") {
         calories = (bmr * 1.375).toFixed(2);
         document.querySelector("#result").innerHTML = `Hii ${name} You need  ${calories} calories/day and Do exercise for 1 to 3 days/week`;
   }
        if(activityIsModerate.value ==="Moderate") {
         calories = (bmr * 1.55).toFixed(2);
          document.querySelector("#result").innerHTML = `Hii ${name} You need ${calories} calories/day and Do exercise for 3 to 5 days/week`;
 }
        if(activityIsHigh.value === "Active") {
         calories = (bmr * 1.725).toFixed(2);
         document.querySelector("#result").innerHTML = ` Hii ${name} You need ${calories} calories/day and Do exercise for 6 to 7 days/week <br>`;
 }
  
    document.querySelector("#result").innerHTML += `Your BMR is ${bmr}`;
}

const targetDiv = document.querySelector(".Answer_Container");
answer.onclick = function () {
    targetDiv.style.display = "block";
  }
answer.addEventListener("click", CalculateBmi);
answer.addEventListener("click", FoodApi);



// For api fetch


async function FoodApi() { 

  //  const url = "https://api.spoonacular.com/mealplanner/generate?apiKey=610a0d2e3dfd44e4ae9469b13ac88e14&timeFrame=day=";
    const url = "./api1.js";
    const response= await fetch(url);
    const res = await response.json();
    console.log(res);
    let num = res.nutrients;
    let Breakfast_Title = res.meals[0].title;
    let Lunch_Title = res.meals[1].title;
    let Dinner_Title = res.meals[2].title;
    let Breakfast_C = num.calories;
    let Lunch_C = num.calories;
    let Dinner_C = num.calories;
    //  generateHTML(res.meals, num);  
    //  function generateHTML(values,num){
    //     let ans = "";
    //      values.map((value) => {
             
    //          ans += `<div>
    //       <h4>Recipe Title:- ${value.title}</h4>
    //         <button id="Get_recipe_btn"><a href ="${value.sourceUrl}"> Get Recipe</a></button>
    //         <p>Calories:- ${num.calories}</p>
    //         </div>`
    //     })
     document.getElementById('BreakFast_recipe_title').innerHTML = `Title:- ${Breakfast_Title}`;
     document.getElementById('Lunch_recipe_title').innerHTML = `Title:- ${Lunch_Title}`;
    document.getElementById('Dinner_recipe_title').innerHTML = `Title:- ${Dinner_Title}`;

    document.getElementById('BreakFast_Cal').innerHTML = `Calories:- ${Breakfast_C}`;
     document.getElementById('Lunch_Cal').innerHTML = `Calories:- ${Lunch_C}`;
    document.getElementById('Dinner_Cal').innerHTML = `Calories:- ${Dinner_C}`;
    
    return res;
 }  

async function mainData() { 
    const data = await FoodApi();
    await GetRecipe(data.meals);
}
mainData();
async function GetRecipe(data) {
    data.map(async (i) => {
        try {
         //   const url = `https://api.spoonacular.com/recipes/${i.id}/information?apiKey=cdd8211df8a64fa6a82b034db7836e79&includeNutrition=true`;
            const url = "./636026.js";
            const response = await fetch(url);
            const res = await response.json();
            console.log("2nd res", res);
            return res;
            // for (const element of res) {
            //     document.querySelector("#result").innerHTML = `"${element.extendedIngredients}"`;
            // }
        }
        catch (error) {
            console.log(error);
            console.log("There is some error in this program");
        }
    });  
}
function main() {
    
 }



