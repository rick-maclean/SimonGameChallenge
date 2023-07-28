// alert("hi there");
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ['red', 'blue', 'green', 'yellow'];

var gameStarted = false;
var level = 0;

$(document).on("keydown", function(event) {
    // do something when the keydown event is fired
    console.log(`Key ${event.key} was pressed`);
    if (gameStarted === false) {
        gameStarted = true;
        nextSequence();
        //console.log(level);
    }
  });

function nextSequence () {
    //return numbers 0 1 2 3
    var randomNumber =  Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    flashButton(randomChosenColour);
    playButtonSound(randomChosenColour);
    console.log("game clicked "+randomChosenColour);
    console.log("gamePattern is "+gamePattern);
    $("h1").text("Level "+level);
    level++;
}


function flashButton(whichButton){
    $("#"+whichButton).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(whichButton){
    $("#"+whichButton).addClass("pressed");
    setTimeout(() => { 
        $("#"+whichButton).removeClass("pressed");
    }, 200);
}

function playButtonSound(whichButton) {
    var soundFile = "";
    switch (whichButton) {
        case "red":
            soundFile = "sounds/red.mp3";
          break;
        case "green":
            soundFile = "sounds/green.mp3";
        break;
        case "yellow":
            soundFile = "sounds/yellow.mp3";
            break;
        case "blue":
            soundFile = "sounds/blue.mp3";
            break;
        default:
            soundFile = "sounds/wrong.mp3";
          // code block
      }
      var aud = new Audio(soundFile);
      aud.play();
}

$(".btn").on("click", function(event) {
    //console.log("a button was clicked");
    //console.log(event.target.id);
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playButtonSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length);
});



  function checkAnswer (playerLevel) {
    var gamePartForCurrentLevel = gamePattern.slice(0,playerLevel);
    console.log("gamePartForCurrentLevel is "+gamePartForCurrentLevel);
    console.log("userPattern is "+userClickedPattern);
    console.log("gamePattern is "+gamePattern);
    // console.log(JSON.stringify(gamePartForCurrentLevel)==JSON.stringify(userClickedPattern));
    if (JSON.stringify(gamePartForCurrentLevel)==JSON.stringify(userClickedPattern)) {
        console.log("success up to "+playerLevel+" buttons pressed");
        if (playerLevel === level) {
            setTimeout(() => { 
                nextSequence();;
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        console.log("wrong at "+playerLevel+" buttons pressed");
        startOver();
        // console.log("userPattern is "+userClickedPattern);
        // console.log("gamePattern is "+gamePattern);
    }
  }

  function startOver() {
        level = 0;
        $("h1").text("Game Over, Press Any Key to Restart");
        userClickedPattern = [];
        gamePattern = [];
        gameStarted = false;
        animateGameOver();
        var aud = new Audio("sounds/wrong.mp3");
        aud.play();
  }

  function animateGameOver(){
    $("body").addClass("game-over");
    setTimeout(() => { 
        $("body").removeClass("game-over");
    }, 400);
}
