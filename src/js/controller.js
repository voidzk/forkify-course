import * as model from './model.js';
import { MODEL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import pagiView from './views/PagiView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}
//====================SECTION 4 loading recipe from API ==========//
//
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    //PART render spinner
    if (!id) return;
    // if (!recipeView.dataStatus) return;
    recipeView.renderSpinner();

    // update results view to mark seclected search result
    resultsView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks);
    //PART loading recipe
    await model.loadRecipe(id);

    //2) rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(`from controller ../${err}`);
  }
};

//====================SECTION 12 SEARCH //
//
const controlSearchResults = async function () {
  try {
    //PART -> V , to get query
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    //PART -> M , set data in model
    await model.loadSearchResults(query);

    //
    //PART -> V ,to render results and pagination buttons
    resultsView.render(model.getSearchResultPage());
    pagiView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (p) {
  resultsView.render(model.getSearchResultPage(p));
  pagiView.render(model.state.search);
  pagiView.update(model.state.search);
};

//-------------------SECTION 17 update servings
const controlServings = function (newServings) {
  //update the recipe servings (in state)
  model.updateServings(newServings);
  //update the recipe view
  recipeView.update(model.state.recipe);
};
//
//-------------------SECTION 19 add bookmarks
//
const controlAddBookmark = function () {
  //add or remove boomarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // update recipe view
  recipeView.update(model.state.recipe);
  //
  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
//------------------------------------------------
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
//----------------------------------------
const controlAddRecipe = async function (newRecipe) {
  try {
    //
    const test = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .every(entry => entry[1].split(',').length === 3);
    if (!test) {
      alert('ingredients inputs are not valid');
      return;
    }
    //spinner loading render
    addRecipeView.renderSpinner();
    console.log(newRecipe);
    //
    //
    await model.uploadRecipe(newRecipe);

    //render recipe
    recipeView.render(model.state.recipe);

    //Success message
    addRecipeView.renderMessage();

    //render bookmarkView
    bookmarksView.render(model.state.bookmarks);

    //change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back()

    //close recipe
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
    //
  } catch (err) {
    console.error('emoji.', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  pagiView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('Welcome!');
};
//
init();

// const forTest = document.querySelector('.header');
// forTest.addEventListener('click', function () {
//   console.log('testing');
// });
