//* Search Button Event Handler
const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', () => {
    const foodName = document.getElementById('food-input').value;
    if (foodName === '') {
        document.getElementById('error').style.display = 'block';
    }
    else {
        loadData(foodName);
        document.getElementById('error').style.display = 'none';
        document.getElementById('show-meal-item').style.display = 'none';
    }
})


//* Display Food Data
async function loadData(name) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(url)
    const data = await response.json()
    displayData(data);
}


//* Display Food Data
const displayData = data => {
    const displayItem = document.getElementById('content');
    const meal = data.meals;
    if (meal === null) {
        alert('Opps! No data found');
    }
    else {
        let empty = '';
        meal.forEach(element => {
            const foodInfo = `
        <div onclick ="loadExtraInfo('${element.strMeal}')" class="card food-info">
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
}


//* Display Extra Food Info
const loadExtraInfo = name => {
    document.getElementById('error').style.display = 'none';
    document.getElementById('show-meal-item').style.display = 'block';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const showMealItem = document.getElementById('show-meal-item');
            const foodInfo = `
        <div id="img-info">
            <div>
                <img src="${meal.strMealThumb}">
                <h4>${meal.strMeal}</h4>
            </div> 
            <div>
                <h6>Ingredients</h6>
                <ul>
                    <li>${meal.strMeasure1} ${meal.strIngredient1}</li>
                    <li>${meal.strMeasure2} ${meal.strIngredient2}</li>
                    <li>${meal.strMeasure3} ${meal.strIngredient3}</li>
                    <li>${meal.strMeasure4} ${meal.strIngredient4}</li>
                    <li>${meal.strMeasure5} ${meal.strIngredient5}</li>
                </ul>
            </div>
        </div>
        `;
            showMealItem.innerHTML = foodInfo;
        })
}

//* Thank You