"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */
function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $submitForm.hide();
  $myStoriesList.hide();
  $favoriteStoriesList.hide();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
  $submitForm.hide();
  $favoriteStoriesList.hide();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  hidePageComponents();
  putStoriesOnPage();
  $navLogin.hide();
  $loginForm.hide();
  $signupForm.hide();
  $navLogOut.show();
  $navSubmit.show();
  $navFavorites.show();
  $navMyStories.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}


function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  $submitForm.toggle();
  $allStoriesList.show();
  $favoriteStoriesList.hide();
  $myStoriesList.hide();
}
$navSubmit.on("click", navSubmitClick);

function navFavoritesClick(evt) {
  console.debug("navFavoritesClick");
  $allStoriesList.hide();
  $submitForm.hide();
  $favoriteStoriesList.show();
  $myStoriesList.hide();
  putFavoritesOnPage();
}
$navFavorites.on("click", navFavoritesClick);

function navMyStoriesClick(evt) {
  console.debug("navFavoritesClick");
  $allStoriesList.hide();
  $submitForm.hide();
  $myStoriesList.show();
  $favoriteStoriesList.hide();
  putMyStoriesOnPage();
}
$navMyStories.on("click", navMyStoriesClick);


