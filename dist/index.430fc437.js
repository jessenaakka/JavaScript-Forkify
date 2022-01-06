const recipeContainer = document.querySelector('.recipe');
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
// Function for findng one recipe data test-url:https://forkify-api.herokuapp.com/api/get?rId=47746
const showRecipe = async function(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.error}`);
        console.log(res, data);
        let { recipe  } = data;
        recipe = {
            id: recipe.recipe_id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            imgage: recipe.image_url,
            socialRank: recipe.social_rank,
            publisherUrl: recipe.publisher_url,
            ingredients: recipe.ingredients
        };
        console.log(recipe);
    } catch (err) {
        alert(err);
    }
};

//# sourceMappingURL=index.430fc437.js.map
