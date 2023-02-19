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
const card = document.querySelector(".card-box");
const ingrediants =  document.querySelector(".ingrediants");
const equipment = document.querySelector(".equipment");
const steps = document.querySelector(".steps");
const tbody = document.querySelector("tbody") ///
const bgSection = document.querySelector(".bg");
const recipeBg = document.querySelector(".recipe");


// const apiKey1 = "319e5f2c16624f60886cfc05ba90a960";
// const apiKey2 = "93da866e49ab4c49884596bf44fa775c";
// const apiKey3 = "6166a57833444a709cc5b3c5d0ec87df";

async function CalculateBmi() {
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

    const url = `https://api.spoonacular.com/mealplanner/generate?apiKey=319e5f2c16624f60886cfc05ba90a960&timeFrame=day&targetCalories=${calories}`;
    const res = await fetch(url);
    const respData = await res.json();
    return respData;
}

const targetDiv = document.querySelector(".Answer_Container");
answer.onclick = function () {
    targetDiv.style.display = "block";
  }
answer.addEventListener("click", CalculateBmi);



// For api fetch


async function FoodApi() { 

   const url = "https://api.spoonacular.com/mealplanner/generate?apiKey=319e5f2c16624f60886cfc05ba90a960&timeFrame=day";
    const response= await fetch(url);
    const res = await response.json(); 
    return res;
 }  

async function mainData() { 
    const data = await FoodApi();
    await GetRecipe(data.meals);
}
mainData();

async function GetRecipe(data) {
     card.innerHTML = " ";
    ingrediants.innerHTML = " ";
    equipment.innerHTML = " ";
    steps.innerHTML = " ";
    data.map(async (i) => {
        try {
           const url = `https://api.spoonacular.com/recipes/${i.id}/information?apiKey=319e5f2c16624f60886cfc05ba90a960&includeNutrition=false`;
            const response = await fetch(url);
            const res = await response.json();
          //  console.log("2nd res", res);
             generateHTML(res);
        }
        catch (error) {
            console.log(error);
            console.log("There is some error in this program");
        }
    });  
}

async function generateMeal(){
    const data =await CalculateBmi()
    await GetRecipe(data.meals);
}
answer.addEventListener('click', generateMeal);


function generateHTML(results) {
    bgSection.style.display = "none"
    recipeBg.style.display = "none"
    const item = document.createElement("span");
    const img = document.createElement("img");
    const title = document.createElement("h3")
    let getRecipeBtn = document.createElement("Button");
    item.setAttribute("class","grid");

    function getRecipeData(){
    //Showing the Recipe Background along with List element
        bgSection.style.display = "block"
        recipeBg.style.display = "block"

        //Adding the ingredients
        ingrediants.innerHTML = " ";
        ingrediants.innerHTML = `<h2>Ingredients</h2>`;
        let apiIngre = results.extendedIngredients;
        for(let i=0;i<apiIngre.length;i++){
            let para = document.createElement("li");
            let newPara = apiIngre[i].original;
            para.innerHTML = newPara;
            ingrediants.appendChild(para);
        }

        //Adding the Equipments
        equipment.innerHTML = " ";
        equipment.innerHTML = `<h2>Equipment</h2>`;
        for(let j=0;j<results.analyzedInstructions.length;j++){
            let apiEqipment = results.analyzedInstructions[j].steps;
            for(let i=0;i<apiEqipment.length;i++){
                let apiEqipment2 = apiEqipment[i].equipment;
                for(let k=0;k<apiEqipment2.length;k++){
                let para = document.createElement("li");
                let newPara = apiEqipment2[k].name;
                para.innerHTML = newPara;
                equipment.appendChild(para);
            }
        }
        }

        //Adding the Steps
        steps.innerHTML = " ";
        steps.innerHTML = `<h2>Steps</h2>`;
        let ol = document.createElement("ol");
        for(let j=0;j<results.analyzedInstructions.length;j++){
        let apiStep = results.analyzedInstructions[j].steps
        for(let i=0;i<apiStep.length;i++){
            let para = document.createElement("li");
            let newPara = apiStep[i].step;
            para.innerHTML = newPara;
            ol.appendChild(para)
            steps.appendChild(ol);
        }
    }   
    }
    getRecipeBtn.setAttribute("class" , "get-btn");
    getRecipeBtn.addEventListener("click", getRecipeData);
    img.setAttribute("src", results.image);
    title.innerHTML = `Title:-${results.title}`;
    getRecipeBtn.innerHTML = "Get Recipe";
    item.appendChild(img);
    item.appendChild(title);
    item.appendChild(getRecipeBtn);
    card.appendChild(item);
}
