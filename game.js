var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//track if the game has started or not, call nextSequence() on the first keypress.
var started = false;

//new variable called level start at  0.
var level = 0;

//detect when a keyboard key has been pressed, then call nextSequence().
$(document).keypress(function() {
  if (!started) {
    // The h1 starts "Press A Key to Start",  change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// detect button clicks, trigger a handler function
$('.btn').click(function(){
  //new variable userChosenColour to store the //id of the button that got clicked.
 var userChosenColour = $(this).attr("id")

 // Add the contents of userChosenColour to the end of  userClickedPattern
 userClickedPattern.push(userChosenColour);
 playSound(userChosenColour);
 animatePress(userChosenColour);
 //2. Call checkAnswer() after a user has clicked , passing in the index of the last answer in the user's sequence.
 checkAnswer(userClickedPattern.length-1);
});

//1. Function called checkAnswer()
function checkAnswer(currentLevel) {

  // Checks if the most recent user answer is the same as the game pattern. log "success" if right, or log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    // If most recent answer's right, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){
      // Call nextSequence() 1000 ms delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
   console.log("wrong");
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  startOver();
  }
}
function nextSequence() {
  //Reset the userClickedPattern to an empty array.
  userClickedPattern = [];
  // Increase the level by one
  level++;
  // update h1 with the change in the level
  $("level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];
 gamePattern.push(randomChosenColour);
 $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 
 playSound(randomChosenColour);
}
function animatePress(currentColour) {
  //  add  pressed class to the button that gets clicked inside animatePress()
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
 audio.play();
}

function startOver(){
level = 0;
gamePattern = [];
started = false;
}



