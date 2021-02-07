document.getElementById('searchBtn').addEventListener('click', function () {
    let mealName = document.getElementById('inputMealName').value;

    if (mealName === '') {
        alert('Are vai ki khaben sheta to Bolen');
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
        fetch(url, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                if(data.meals){
                    displayMeal(data);
                }
                else{
                    alert('Not found! Search something else or Cook yourself');
                }
            });
    }
})

const displayMeal = foods => {
    const foodContainerDiv = document.getElementById('foodContainer');
    foods.meals.forEach(meal => {
        const foodDiv = document.createElement('div');
        foodDiv.className = 'foodPic';
        const mealInfo = `
                <img onclick = "displayMealDetails('${meal.strMeal}')" class = "mealPic" src="${meal.strMealThumb}">
                <h3 onclick = "displayMealDetails('${meal.strMeal}')">${meal.strMeal}</h3>
                `;
        foodDiv.innerHTML = mealInfo;
        foodContainerDiv.appendChild(foodDiv);
    });
}


const displayMealDetails = foodName => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealIngredientInfo(data.meals[0]));
}

const displayMealIngredientInfo = food => {
    const displayMealIngredient = document.getElementById('displayMealIngredient');
    displayMealIngredient.style.display = 'block';

    const allInfo = document.getElementById('allInfo');
    allInfo.style.display = 'none';

    displayMealIngredient.innerHTML = `
                <h3>${food.strMeal}</h3>
                <img class = "mealPic" src="${food.strMealThumb}">
                <h4>Food's strIngredient:</h4>
                <p>==> ${food.strIngredient1}</p>
                <p>==> ${food.strIngredient2}</p>
                <p>==> ${food.strIngredient3}</p>
                <p>==> ${food.strIngredient4}</p>
                <p>==> ${food.strIngredient5}</p>
                <p>==> ${food.strIngredient6}</p>
                <p>==> ${food.strIngredient7}</p>
                `;
                
}
