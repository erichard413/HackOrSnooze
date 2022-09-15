"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

//checks if story is favored
function checkForFavored(story){
  if (currentUser !== undefined) {
  const storyId = story.storyId;
  if (currentUser.favorites.find(s=> s.storyId === storyId)) //checks for equallity between current user favorite storyId & the storyID that is being added. If match, change class to "fav".
  return 'class="starred"'
  }
}

function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup");
    checkForFavored(story)
  const storyUrl = story.url;
  const hostName = story.getHostName(storyUrl);
  return $(`
      <li id="${story.storyId}">
      <span id="star" ${checkForFavored(story)} >&#9733;</span> 
          <a href="${story.url}" target="a_blank" class="story-link">${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}
function generateMyStoriesMarkup(story) {
  console.debug("generateMyStoriesMarkup");
    checkForFavored(story)
  const storyUrl = story.url;
  const hostName = story.getHostName(storyUrl);
  return $(`
      <li id="${story.storyId}">
      <span id="trash">&#128465;</span>
      <span id="star" ${checkForFavored(story)} >&#9733;</span> 
          <a href="${story.url}" target="a_blank" class="story-link">${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function putFavoritesOnPage() {   //similar code to putStoriesOnPage, only loops through currentUser's favorites.
  console.debug("putFavoritesOnPage");
  $favoriteStoriesList.empty();
  const myFavs = currentUser.favorites;
  for(let story of myFavs){
        const $story = generateStoryMarkup(story);
    $favoriteStoriesList.append($story);
  }  $favoriteStoriesList.show();
 }
function putMyStoriesOnPage() {   //similar code to putStoriesOnPage, only loops through currentUser's favorites.
  console.debug("putMyStoriesOnPage");
  $myStoriesList.empty();
  const myStories = currentUser.ownStories;
  for(let story of myStories){
        const $story = generateMyStoriesMarkup(story);
    $myStoriesList.append($story);
  }  $myStoriesList.show();
 }





// Write a function in stories.js that is called when users submit the form. Pick a good name for it. This function should get the data from the form, call the .addStory method you wrote, and then put that new story on the page.

async function submitStory(evt) {
  console.debug("submitStory")
  evt.preventDefault();
  const author = $("#story-author").val();
  const title = $("#story-title").val();
  let url = $("#story-url").val();
  if (url.includes("http://") === false){
    url = ("http://"+url);
  }
  const story = await storyList.addStory(currentUser, {title, url, author});
  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  //hide the form and reset it
  $submitForm.slideUp("slow");
  $submitForm.trigger("reset");
  $allStoriesList.show();
}

$submitForm.on("submit", submitStory);





