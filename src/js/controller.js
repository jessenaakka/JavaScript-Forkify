//Module imports
import * as model from './model.js';
import recipeView from './views/recipeView.js';

//Polyfill es6 methods and fucntions except async
import 'core-js/stable';
//Polyfill async functions
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Function for findng one recipe data test-url:https://forkify-api.herokuapp.com/api/get?rId=47746
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
        alert(err);
    }
};

//Events for recipe show
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes))