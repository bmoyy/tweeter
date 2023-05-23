$(document).ready(function() {

  // $("#tweet-text").on("beforeinput", () => {
  //   console.log("you have pressed a key");
  // });
  $("#tweet-text").on("input", function() {
    const input = $(this);
    const form = input.closest("form");
    const counter = form.find(".counter");

    const remaining = 140 - input.val().length;
    counter.text(remaining);
    counter.toggleClass('limitReached', remaining < 0);
  });


});