document.addEventListener("keydown", function(event) {
    // Create a function to handle the logic for button press
    function handleButtonPress(key, soundFile, buttonSelector) {
        var sound = new Audio(soundFile);
        sound.play();
        
        var button = document.querySelector(buttonSelector);
        button.style.color = "green";  // Change button color to green
        button.classList.add("pressed"); // Add the pressed effect
        
        // After 200ms, revert the button color and remove the pressed effect
        setTimeout(function() {
            button.style.color = "#DA0463";  // Revert to original color
            button.classList.remove("pressed");  // Remove the pressed effect
        }, 200);
    }

    // Switch based on the key pressed
    switch (event.key) {
        case "w":
            handleButtonPress("w", './sounds/crash.mp3', ".w");
            break;

        case "a":
            handleButtonPress("a", './sounds/kick-bass.mp3', ".a");
            break;

        case "s":
            handleButtonPress("s", './sounds/snare.mp3', ".s");
            break;

        case "d":
            handleButtonPress("d", './sounds/tom-1.mp3', ".d");
            break;

        case "j":
            handleButtonPress("j", './sounds/tom-2.mp3', ".j");
            break;

        case "k":
            handleButtonPress("k", './sounds/tom-3.mp3', ".k");
            break;

        case "l":
            handleButtonPress("l", './sounds/tom-4.mp3', ".l");
            break;

        default:
            console.log("Key not mapped to sound.");
    }
});
