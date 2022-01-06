import { async } from 'regenerator-runtime';
import { API_GET_URL } from './config.js';
import { API_SEARCH_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
    },
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
        throw err;
    }
};

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;

        //Get data from search apia
        const data = await getJSON(`${API_SEARCH_URL}?q=${query}`);
        
        //Refactor object keys
        state.search.results = data.recipes.map(rec => {
            return {
                id: rec.recipe_id,
                title: rec.title,
                publisher: rec.publisher,
                sourceUrl: rec.source_url,
                image: rec.image_url,
                socialRank: rec.social_rank,
                publisherUrl: rec.publisher_url
            };
        });

    } catch (err) {
        console.error(`${err} 💥`);
        throw err;
    }
};

loadSearchResults('pizza');