import { async } from 'regenerator-runtime';

export const state = {
    recipe: {}
};

export const loadRecipe = async function(id){
    try{
        //Loading recipe
        const res = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
        const data = await res.json();

        if(!res.ok) throw new Error(`${data.error}`);
        
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
        alert(err);
    }
};