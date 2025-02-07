$(document).ready(function () {
    // list of universal variable that wont change until browser refreshet
    const buttonColors = ["green", "red", "yellow", "blue"];
    let sequenceMemory = [];
    let userSequence = [];
    let levelNumber = 0;
    let gameStarted = false;
    let MaxLevel = 5;
  
    if(levelNumber === MaxLevel){
      $(".row").remove();
      $("#level-title").text("You won the game! if you want to continue the game in next level Press Any BUTTON ");
    }
  
    // Checking if any any button pressed contantly
    $(document).on("keypress", function () {
      if (!gameStarted) { // equivalient of gameStarted = false
        gameStarted = true;
        startNextLevel();
      }
    });
  
    // checking if the Cursor is clicking constantly
    $(".btn").on("click", function () {
      if (!gameStarted)  return; // Ignore clicks if the game hasn't started
      //if(levelNumber === MaxLevel) return;
  
      const userChosenColor = $(this).attr("id"); // Get the color of the clicked button
      userSequence.push(userChosenColor); // Add the clicked color to the user's sequence
  
      animateButton(userChosenColor); // Animate the button
      checkUserSequence(userSequence.length - 1); // Check the user's input( cause Array starts with 0)
    });
  
  
    function startNextLevel() {
      // Reset user sequence for the new level
      userSequence = [];
  
      // Increment level and update title
      levelNumber++;
      $("#level-title").text("Level " + levelNumber);
  
      // Generate a random color, add it to the sequence, and animate it
      const randomIndex = Math.floor(Math.random() * buttonColors.length);
      const randomColor = buttonColors[randomIndex];
      sequenceMemory.push(randomColor);
  
      // Show the sequence to the user
      animateButton(randomColor);
    }
  
    function checkUserSequence(currentIndex) {
      // Check if the user's latest input matches the sequence
      if (userSequence[currentIndex] === sequenceMemory[currentIndex]) {
        // If the user has completed the sequence correctly
        if (userSequence.length === sequenceMemory.length) {
          // Move to the next level after a short delay
          setTimeout(startNextLevel, 1000);
        }
      } else {
        // If the user makes a mistake, game over
        gameOver();
      }
    }
  
    function gameOver() {
      $("#level-title").text("Game Over, Press Any Key to Restart");
  
      // Reset game variables
      sequenceMemory = [];
      userSequence = [];
      levelNumber = 0;
      gameStarted = false;
  
      // Flash the screen red to indicate game over
      $("body").addClass("game-over");
      setTimeout(() => $("body").removeClass("game-over"), 200);
      var sound = new Audio(`./sounds/wrong.mp3`);
      sound.play();
    }
  
    function animateButton(color) {
      const button = $(`#${color}`); // selection corresponding button
      button.addClass("pressed");
      var sound = new Audio(`./sounds/${color}.mp3`);
      sound.play();
  
      // Remove the class after 100 milliseconds
      setTimeout(function () {
        button.removeClass("pressed");
      }, 100);
    }
  });
  
  