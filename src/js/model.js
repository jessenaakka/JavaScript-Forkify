import { async } from 'regenerator-runtime';
import { API_GET_URL, API_SEARCH_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
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

        if(state.bookmarks.some(bookmark => bookmark.id === id)){
            state.recipe.bookmarked = true;
        } else state.recipe.bookmarked = false;

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
        //set default page to 1 when searching
        state.search.page = 1;
    } catch (err) {
        console.error(`${err} 💥`);
        throw err;
    }
};

export const getSearchResultsPage = function(page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end);
};

const presistBookmarks = function(){
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
};

export const addBookmark = function(recipe) {
    //Add bookmark
    state.bookmarks.push(recipe);

    //Mark current recipe as bookmark
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    //Save bookmarks to localstorage
    presistBookmarks();
};

export const deleteBookmark = function(id) {
    //Remove bookmark from the bookmarks array based in the clicked elements ID
    const index = state.bookmarks.findIndex(el => el.id === id)
    state.bookmarks.splice(index, 1);

    //Set bookmarked attribute to false
    if(id === state.recipe.id) state.recipe.bookmarked = false;

    //Save bookmarks to localstorage
    presistBookmarks();
};

const init = function() {
    const storage = localStorage.getItem('bookmarks');
    if(storage) state.bookmarks = JSON.parse(storage);
};
init();

