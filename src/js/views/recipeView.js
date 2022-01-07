//Import parent class
import View from './View.js';
//Import icons
import icons from 'url:../../img/icons.svg';

class RecipeView extends View {
    _parentElement = document.querySelector('.recipe');
    _errorMessage = 'Recipe could not be found. Please try another one!';
    _defaultMessage = 'Start by searching for a recipe or an ingredient. Have fun!';
    

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    }

    addHandlerAddBookmark(handler) {
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--bookmark');
            if (!btn) return;
            handler();
        });
    }

    _generateMarkup() {
        return `
        <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__user-generated" style="visibility: hidden;">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients.map(ing => {
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
            <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.publisherUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
    }
}

export default new RecipeView();