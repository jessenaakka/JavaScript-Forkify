import { async } from 'regenerator-runtime';
import { API_GET_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    recipe: {}
};

export const loadRecipe = async function(id){
    try{

        //Loading recipe
        const data = await getJSON(`${API_GET_URL}?rId=${id}`);
        
        const { recipe } = data;
        state.recipe = {
            id: recipe.recipe_id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            socialRank: recipe.social_rank,
            publisherUrl: recipe.publisher_url,
            ingredients: recipe.ingredients
        }
        console.log(state.recipe);
    } catch (err){
        console.error(`${err} 💥`);
    }
};