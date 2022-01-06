import icons from 'url:../img/icons.svg';
//Polyfill es6 methods and fucntions except async
import 'core-js/stable';
//Polyfill async functions
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const renderSpinner = function(parentEl){
    const markup = `
    <div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
    </div>
    `;
    parentEl.innerHTML = '';
    parentEl.insertAdjacentHTML('afterbegin', markup);
}

// Function for findng one recipe data test-url:https://forkify-api.herokuapp.com/api/get?rId=47746
const showRecipe = async function(url){
    try{
        //render spinner load
        renderSpinner(recipeContainer);
        //Loading recipe
        const res = await fetch(url);
        const data = await res.json();

        if(!res.ok) throw new Error(`${data.error}`);
        
        console.log(res, data);
        let {recipe} = data;
        recipe = {
            id: recipe.recipe_id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            socialRank: recipe.social_rank,
            publisherUrl: recipe.publisher_url,
            ingredients: recipe.ingredients
        }
        console.log(recipe);

        //Rendering recipe
        const markup = `
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(ing => {
                return `
                <li class="recipe__ingredient">
                    <div class="recipe__description">
                        ${ing}
                    </div>
                </li> 
                `
            }).join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.publisherUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
        recipeContainer.innerHTML = '';
        recipeContainer.insertAdjacentHTML('afterbegin', markup);
    } catch(err){
        alert(err);
    }
};

showRecipe('https://forkify-api.herokuapp.com/api/get?rId=47746');

