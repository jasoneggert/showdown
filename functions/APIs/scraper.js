// import the module
const recipeScraper = require('recipe-scraper');
const axios = require('axios');

exports.findRecipes = async (request, response) => {

    const sites = [
        'https://www.101cookbooks.com/',
        'https://www.allrecipes.com/recipe',
        'https://www.ambitiouskitchen.com/',
        'https://www.averiecooks.com/',
        'https://www.bbc.co.uk/food/recipes/',
        'https://www.bbcgoodfood.com/recipes/',
        'https://www.bonappetit.com/recipe/',
        'https://www.budgetbytes.com/',
        'https://www.centraltexasfoodbank.org/recipe/',
        'https://www.closetcooking.com/',
        'https://cookieandkate.com/',
        'https://copykat.com/',
        'https://damndelicious.net/',
        'http://www.eatingwell.com/recipe',
        'https://www.epicurious.com/recipes/',
        'https://www.finecooking.com/recipe',
        'https://www.food.com/recipe/',
        'https://www.foodandwine.com/recipes/',
        'https://www.foodnetwork.com/recipes/',
        'http://www.gimmesomeoven.com/',
        'https://www.kitchenstories.com/en/recipes',
        'https://www.minimalistbaker.com/',
        'https://www.myrecipes.com/recipe',
        'https://www.nomnompaleo.com/',
        'https://www.omnivorescookbook.com/',
        'https://www.seriouseats.com/',
        'https://www.simplyrecipes.com/recipes/',
        'https://smittenkitchen.com/',
        'https://thepioneerwoman.com/food-cooking/',
        'https://therealfoodrds.com/',
        'https://www.thespruceeats.com/',
        'https://whatsgabycooking.com/',
        'https://www.woolworths.com.au/shop/recipedetail/',
        'https://www.yummly.com/recipe',
    ];

    // enter a supported recipe url as a parameter - returns a promise

    const recipes = await Promise.all(sites.map(async (site) => {
        try {
            let recipe = await recipeScraper(site + '/' + request.body.recipeName);
            if (recipe) {
                recipe.name = `${recipe.name} (from ${site})`
                console.log('recipe: ', recipe);
                return recipe
            }
        } catch (error) {
            console.log('error', error.message);
            return null;
        }
    }));

    return response.json(recipes);


};

