/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  const createTweetElement = function(tweetData) {
    return $(`
  <article class="tweets">
  <div class="user">
    <div class="profile">
      <img class= "profile-picture" src=${tweetData.user.avatars}>
      <h5 class="username">${escape(tweetData.user.name)}</h5>
    </div>
    <div class="display-name">${escape(tweetData.user.handle)}</div>
  </div>
  <div class="tweet-message">
    <p name="text" id="tweet-message">${escape(tweetData.content.text)}</p>
  </div>
  <div class="extras">
    <h4 class="date">${timeago.format(tweetData.created_at)}</h4>
    <div class="tweet-icons">
      <i class="fas fa-flag icon"></i>
      <i class="fas fa-retweet icon"></i>
      <i class="fas fa-heart icon"></i>
    </div>
  </div>
</article>`);
  };



  $('#tweet-submit').on('submit', function(event) {
    event.preventDefault();
    const maxLength = 140;
    const tweetlength = $(this).find("textarea").val().length;
    $('#error').slideUp("fast");

    if (tweetlength > maxLength) {
      return $('#error').html('Exceeded max character limit of 140.'), $('#error').slideDown("slow");
    }

    if (tweetlength === 0) {
      return $('#error').html('Cannot send an empty tweet! Please enter text.'), $('#error').slideDown("slow");
    }

    const encodedTweet = $('#tweet-submit').serialize();

    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: encodedTweet
    }).then(() => {
      loadTweets();
    });

    const counter = $('.counter');
    counter.text(maxLength);
    $(this).find("textarea").val("");
  });

  const loadTweets = function() {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: 'GET',
    }).then((data) => {
      renderTweets(data);
    });
  };

  loadTweets();
});