let userClickedPattern = [];  // Declared globally to store user clicks
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];

function nextSequence() {
  // Generate a random color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Flash animation for the selected button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play sound for the selected button
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

// Detect button clicks and store them in userClickedPattern
$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);  // Verify the array in the console
});