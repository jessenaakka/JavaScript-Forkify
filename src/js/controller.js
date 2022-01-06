//Module imports
import * as model from './model.js';
import recipeView from './views/recipeView.js';

//Polyfill everything else except async
import 'core-js/stable';
//Polyfill async functions
import 'regenerator-runtime/runtime';
import { recip } from 'prelude-ls';

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

const init = function() {
    recipeView.addHandlerRender(controlRecipes);
}
init();