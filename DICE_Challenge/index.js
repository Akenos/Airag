// Generate random numbers between 1 and 6 for each player
const randomNumber1 = Math.floor(Math.random() * 6) + 1;
const randomNumber2 = Math.floor(Math.random() * 6) + 1;

// Find the image elements for Player 1 and Player 2
const diceImage1 = document.querySelector('.img1');
const diceImage2 = document.querySelector('.img2');

// Update the 'src' attributes using setAttribute() to reflect the random dice images
diceImage1.setAttribute('src', `./images/dice${randomNumber1}.png`);
diceImage2.setAttribute('src', `./images/dice${randomNumber2}.png`);

if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").textContent = " 🚩 Player 1 WINS!";
} else if (randomNumber1 < randomNumber2) {
    document.querySelector("h1").textContent = "Player 2 WINS! 🚩";
} else {
    document.querySelector("h1").textContent = "It's a Draw!";
}

setTimeout(() => {
    // Reset the text content of the <h1> to its original state
    document.querySelector("h1").textContent = "Refresh Me";
    // You can also reset the dice images if you want
    diceImage1.setAttribute('src', './images/dice6.png');
    diceImage2.setAttribute('src', './images/dice6.png');
}, 5000); // 5000 milliseconds = 5 seconds