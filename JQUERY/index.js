let typingTimer;  // Timer variable
const doneTypingInterval = 300;  // Time to wait after typing stops (in ms)
let typedText = '';  // Variable to store the typed text
var i = 0;
$(document).keyup(function(event) {
  clearTimeout(typingTimer);  // Reset the timer on every keyup event

  // Append the key pressed to the typed text
  typedText += event.key;
  
  // Set a timer to update the text after typing stops
  typingTimer = setTimeout(function() {
    $("h1").text(typedText+(i++));  // Update the <h1> text after 1 second of inactivity
  }, doneTypingInterval);
});