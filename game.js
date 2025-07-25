// Array of button colors that will be used in the game.
var buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to store the game's sequence and the user's sequence of clicks.
var gamePattern = [];
var userClickedPattern = [];

// Boolean to track whether the game has started.
var gameStart = false;

// Variable to track the current level of the game.
var level = 0;

// Event listener to detect a key press and start the game if it hasn't already started.
$(document).keydown(function() {
    if (!gameStart) {
        // Update the heading to display the current level.
        $("#level-title").text("Level " + level);

        // Mark the game as started and initiate the first sequence.
        gameStart = true;
        nextSequence();
    }
});

// Event listener to detect when a button is clicked by the user.
$(".btn").on("click", function() {
    // Get the ID of the button that was clicked.
    var userChosenColour = $(this).attr("id");

    // Add the chosen color to the user's sequence.
    userClickedPattern.push(userChosenColour);

    // Play the sound for the chosen color.
    playSound(userChosenColour);

    // Animate the button press.
    animatePress(userChosenColour);

    // Check the user's answer by passing the index of the last clicked color.
    checkAnswer(userClickedPattern.length - 1);
});

// Function to check the user's answer.
function checkAnswer(currentLevel) {
    // Compare the user's input at the current level to the game's sequence.
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        // If the user has completed the current sequence, move to the next one after a delay.
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        // If the user gets the sequence wrong, play the "wrong" sound.
        playSound("wrong");

        // Add the "game-over" class to the body to show a red flash effect.
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // Update the heading to indicate the game is over and prompt the user to restart.
        $("#level-title").text("Game over, press any key to restart");

        // Reset the game variables to start over.
        startOver();
    }
}

// Function to generate the next sequence in the game.
function nextSequence() {
    // Reset the user's pattern for the new level.
    userClickedPattern = [];

    // Increment the level and update the heading.
    level++;
    $("#level-title").text("Level " + level);

    // Generate a random number and select the corresponding color.
    var randomNumber = Math.floor(Math.random() * buttonColours.length);
    var randomChosenColour = buttonColours[randomNumber];

    // Add the chosen color to the game pattern.
    gamePattern.push(randomChosenColour);

    // Flash the button for the chosen color.
    $("#" + randomChosenColour).fadeOut().fadeIn();

    // Play the sound for the chosen color.
    playSound(randomChosenColour);
}

// Function to play a sound based on the given color name.
function playSound(name) {
    // Create a new Audio object with the corresponding sound file.
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to animate a button press by adding and removing the "pressed" class.
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Function to reset the game variables and prepare for a new game.
function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;
}



/*

Explanation of Key Parts:
Game Initialization:
The keydown event starts the game and calls nextSequence() to begin.

Button Click Handling:
The click event on .btn records the user's input, plays the corresponding sound, animates the press, and validates the user's sequence with checkAnswer().

Sequence Generation:
The nextSequence() function generates a random color, updates the gamePattern, and displays it using animations and sounds.

Answer Validation:
The checkAnswer() function ensures that each input matches the game's sequence. If the user completes a level successfully, it advances to the next one. Otherwise, it triggers a "game over."

Game Reset:
The startOver() function resets the level, sequence, and game state for a fresh start
*/