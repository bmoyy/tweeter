/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };

  const createTweetElement = function(tweetData) {
    return $(`
  <article class="tweets">
  <div class="user">
    <div class="profile">
      <img class= "profile-picture" src=${tweetData.user.avatars}>
      <h5 class="username">${tweetData.user.name}</h5>
    </div>
    <div class="display-name">${tweetData.user.handle}</div>
  </div>
  <div class="tweet-message">
    <textarea name="text" id="tweet-message">${tweetData.content.text}</textarea>
  </div>
  <div class="extras">
    <h4 class="date">${tweetData.created_at}</h4>
    <div class="tweet-icons">
      <i class="fas fa-flag icon"></i>
      <i class="fas fa-retweet icon"></i>
      <i class="fas fa-heart icon"></i>
    </div>
  </div>
</article>`);
  };

  $('#tweet-submit').on('submit', (event) => {
    event.preventDefault();
    const encodedTweet = $('#tweet-submit').serialize();

    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: encodedTweet
    }).then(() => {
      console.log(encodedTweet);

    });
  });

  const loadTweets = function() {
    $.ajax({
      url:"http://localhost:8080/tweets",
      method: 'GET',
    }).then((data) => {
      renderTweets(data);
    })
  };

  loadTweets();
});