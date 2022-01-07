//Module imports
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarkView.js';

//Polyfill everything else except async
import 'core-js/stable';
//Polyfill async functions
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView.js';

//Script for parcel to restore state when reload
if(module.hot) {
    module.hot.accept();
}

///////////////////////////////////////

//Handler for rendering recipes
const controlRecipes = async function(){
    try{
        //Find the recipe id from url hash
        const id = window.location.hash.slice(1);
        
        //If hash is empty return
        if(!id) return;

        //Render spinner when fetching load
        recipeView.renderSpinner();

        //Update views
        resultsView.update(model.getSearchResultsPage());
        bookmarksView.update(model.state.bookmarks);

        //Load recipe. This is a async function that return promise so use await
        await model.loadRecipe(id);

        //Rendering recipe
        recipeView.render(model.state.recipe);
    } catch(err){
        recipeView.renderError();
    }
};

//Handler for search results
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
        resultsView.render(model.getSearchResultsPage());

        //Render pagination
        paginationView.render(model.state.search);
    } catch(err) {
        resultsView.renderError(err);
        console.error(err);
    }
};

//Handler for pagination
const controlPagination = function(goToPage) {
    //Render results for the new page
    resultsView.render(model.getSearchResultsPage(goToPage));
    
    //Render new buttons for the new page
    paginationView.render(model.state.search);
};

//Handler for bookmarks
const controlAddBookmark = function() {
    //If recipe is not bookmarked add to bookmarks
    if(!model.state.recipe.bookmarked){
        model.addBookmark(model.state.recipe);
    } else {
        //If recipe is in bookmarks remove it from there
        model.deleteBookmark(model.state.recipe.id);
    }
    //Update recipe view
    recipeView.update(model.state.recipe);

    //Render bookamrks
    bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function() {
    bookmarksView.render(model.state.bookmarks);
};

const init = function() {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};
init();