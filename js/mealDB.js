const searchFood = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // console.log(searchText);
  const spinner = document.getElementById('preloader');
  spinner.classList.remove('d-none');
  const searchResult = document.getElementById('search-result');
  // clear search result 
  // searchResult.innerHTML = '';
  searchResult.textContent = '';

  const url = `
  https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}
  `;
  // console.log(url);
  fetch (url)
  .then(res => res.json())
  .then(data => displaySearchResult(data.meals));

  searchField.value = '';
}


const displaySearchResult = meals => {
  const searchResult = document.getElementById('search-result');
  // clear search result 
  // searchResult.innerHTML = '';
  searchResult.textContent = '';

  // if search result not fount / check condition 
  if(meals.length == 0){
    // Complete later 
  }

  // load data 
  meals.forEach(meal => {
    // console.log(meal);
    const div = document.createElement('div');
    div.classList.add('col-lg-4', 'mb-5');
    div.innerHTML = `
    <div onclick="loadMealDetail(${meal.idMeal})" class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal} </h5>
          <p class="card-text">${meal.strInstructions.slice(0, 150)} </p>
        </div>
    </div>
    `;
    searchResult.appendChild(div);
  })
  const spinner = document.getElementById('preloader');
  spinner.classList.add('d-none');
}

// get dynamic details

const loadMealDetail = mealId => {
  console.log(mealId);
  const url = `
  https://www.themealdb.com/api/json/v1/1/lookup.php?i= ${mealId}
  `;
  fetch(url)
  .then(res => res.json())
  .then(data => displayMealDetail(data.meals[0]));
}

const displayMealDetail = meal => {
  console.log(meal);
  const mealDetails = document.getElementById('meal-details')
  const div = document.createElement('div')
  div.classList.add('card')
  div.innerHTML = `
  <img src="${meal.strMealThumb} " class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal} </h5>
    <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
    <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Go somewhere</a>
  </div>
  `;
  mealDetails.appendChild(div);
}
