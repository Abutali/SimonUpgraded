var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").html("Level " + level);
  level++;
}

if (screen.width > 950) {
  $(document).one("keydown", function() {
    nextSequence();
  });
} else {
  $("h1").html("Touch anywhere to Start the game!")
  $(document).one("click", function() {
    nextSequence();
  });
}

$(".btn").click(function(event) {
  var userEventTarget = event.target;
  var userChosenColour = $(userEventTarget).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (userClickedPattern[(userClickedPattern.length) - 1] === gamePattern[(userClickedPattern.length) - 1]) {
    if (userClickedPattern.length === gamePattern.length) {
      if (JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern)) {
        setTimeout(function() {
          nextSequence();
        }, 850);
        while (userClickedPattern.length > 0) {
          userClickedPattern.pop();
        }
      }
    }
  } else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    startOver();


  }

})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
var level = 0;

function startOver() {
  if (screen.width > 950) {
    $("h1").html("Game Over! Press any key to restart");
    $(document).one("keydown", function() {
      nextSequence();
    });
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
  } else {
    
    $("h1").html("Game Over! Touch here to restart");


    $("h1").one( "click", function() {
      nextSequence();} );

    level = 0;
    gamePattern = [];
    userClickedPattern = [];
   }
}
