let typingTimer;  // Timer variable
const doneTypingInterval = 1000;  // 1 second after typing stops

$(document).keypress(function(event) {
  clearTimeout(typingTimer);  // Reset the timer on every keypress
  
  typingTimer = setTimeout(function() {
    $("h1").text(event.key);  // Update text after typing stops
  }, doneTypingInterval);
});