//Module imports
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

//Polyfill everything else except async
import 'core-js/stable';
//Polyfill async functions
import 'regenerator-runtime/runtime';
import { recip } from 'prelude-ls';

//Script for parcel to restore state when reload
if(module.hot) {
    module.hot.accept();
}

///////////////////////////////////////

const controlRecipes = async function(){
    try{
        //Find the recipe id from url hash
        const id = window.location.hash.slice(1);
        
        //If hash is empty return
        if(!id) return;

        //Render spinner when fetching load
        recipeView.renderSpinner();

        //Load recipe. This is a async function that return promise so use await
        await model.loadRecipe(id);

        //Rendering recipe
        recipeView.render(model.state.recipe);
    } catch(err){
        recipeView.renderError();
    }
};

const controlSearchResults = async function() {
    try{
        //Load spinner when search starts
        resultsView.renderSpinner();

        //Get the search value
        const query = searchView.getQuery();
        if(!query) return;

        //Load search results
        await model.loadSearchResults(query);

        //Render results
        resultsView.render(model.state.search.results);

    } catch(err) {
        resultsView.renderError(err);
        console.error(err);
    }
};

const init = function() {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
};
init();