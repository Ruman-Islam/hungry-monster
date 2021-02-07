// * search button
const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', function () {
    const foodInput = document.getElementById('food-input').value;
    loadData(foodInput);
})

// * display food data
async function loadData(name) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(url)
    const data = await response.json()
    displayData(data);
}

// * display food data
const displayData = data => {
    const displayItem = document.getElementById('content');
    const meal = data.meals;
    let empty = '';
    meal.forEach(element => {
        const foodInfo = `
        <div onclick ="loadMoreData('${element.strMeal}')" class="card food-info">
            <img src="${element.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${element.strMeal}</h5>
            </div>
        </div>
        `;
        empty = empty + foodInfo;
    });
    displayItem.innerHTML = empty;
}

// * display more food info
const loadMoreData = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const showMealItem = document.getElementById('show-meal-item');
            const foodInfo = `
        <div id="img-info">
            <img src="${meal.strMealThumb}">
            <h4>${meal.strMeal}</h4>  
            <h6>Ingredients</h6>
            <ul class="list-unstyled">
                <li>${meal.strMeasure1} ${meal.strIngredient1}</li>
                <li>${meal.strMeasure2} ${meal.strIngredient2}</li>
                <li>${meal.strMeasure3} ${meal.strIngredient3}</li>
                <li>${meal.strMeasure4} ${meal.strIngredient4}</li>
                <li>${meal.strMeasure5} ${meal.strIngredient5}</li>
                <li>${meal.strMeasure6} ${meal.strIngredient6}</li>
                <li>${meal.strMeasure7} ${meal.strIngredient7}</li>
                <li>${meal.strMeasure8} ${meal.strIngredient8}</li>
                <li>${meal.strMeasure9} ${meal.strIngredient9}</li>
            </ul>
        </div>
        `;
            showMealItem.innerHTML = foodInfo;
        })
}