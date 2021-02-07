const searchButton = document.querySelector('#search-btn');
searchButton.addEventListener('click', () => {
    const foodInput = document.querySelector('#food-input').value;
    loadData(foodInput);
})

async function loadData(foodName) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    const response = await fetch(url)
    const data = await response.json()
    displayData(data);
}

const displayData = data => {
    const foodInput = document.querySelector('#food-input').value;
    const parentDiv = document.getElementById('foodInfo-area');
    const meal = data.meals;
    meal.forEach(element => {
        console.log(element);
        const foodName = element.strMeal;
        const foodImg = element.strMealThumb;
        const foodInfo = `
            <div onclick=loadMoreData('${foodInput}') class="foodInfoDiv">
                <img src="${foodImg}">
                <h5>${foodName}</h5>
            </div>
        `;
        parentDiv.innerHTML = foodInfo;
    });
}

async function loadMoreData(foodName) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    const response = await fetch(url)
    const data = await response.json()
    displayMoreData(data);
}

const displayMoreData = data => {
    document.getElementById('search-areaDiv').style.visibility = 'hidden';
    const parentDiv = document.getElementById('foodInfo-area');
    const meal = data.meals;
    meal.forEach(element => {
        const foodInfo = `
        <div class="img-info">
            <img src="${element.strMealThumb}">
            <h5>${element.strMeal}</h5>
        </div>
        <div class="food-info">
            <h4>Ingredients</h4>
            <ul>
                <li>${element.strIngredient1}</li>
                <li>${element.strIngredient2}</li>
                <li>${element.strIngredient3}</li>
                <li>${element.strIngredient4}</li>
                <li>${element.strIngredient5}</li>
                <li>${element.strIngredient6}</li>
                <li>${element.strIngredient7}</li>
                <li>${element.strIngredient8}</li>
                <li>${element.strIngredient9}</li>
            </ul>
        </div>
        `;
        parentDiv.innerHTML = foodInfo;
    });
}















// const searchButton = document.querySelector('#search-btn');
// searchButton.addEventListener('click', () => {
//     const foodInput = document.querySelector('#food-input').value;
//     sendApiRequest(foodInput);
// })

// async function sendApiRequest(foodName) {
//     const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
//     const response = await fetch(url)
//     const data = await response.json()
//     getData(data.meals);
// }

// const getData = foodArray => {
//     console.log(foodArray);
//     const mealName = foodArray[0].strMeal;
//     const mealImage = foodArray[0].strMealThumb;
//     updateUI(mealName, mealImage);
// }

// function updateUI(name, image) {
//     const foodInput = document.querySelector('#food-input').value;
//     const foodInfoArea = document.querySelector('#foodImg-area');
//     console.log(name);
//     const info = `
//         <div onclick = loadMoreData('${foodInput}') class="foodInfoDiv">
//             <img src="${image}">
//             <h5>${name}</h5>
//         </div>
//     `;
//     foodInfoArea.innerHTML = info;
// }

// function loadMoreData(foodName) {
//     fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
//         .then(response => response.json())
//         .then(data => {
//             const meal = data.meals;
//             const foodInfoArea = document.querySelector('#foodImg-area');
//             meal.forEach(element => {
//                     foodInfoArea.innerHTML = `
//                     <p>${element.strIngredient1} </p>
//                     <p>${element.strIngredient2} </p>
//                     <p>${element.strIngredient3} </p>
//                     <p>${element.strIngredient4} </p>
//                 `;
//             });
//         })
// }