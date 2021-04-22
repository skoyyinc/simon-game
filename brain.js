colors = ["green", "red", "blue", "yellow"];

currentSequence = [];
answerSequence = [];

highScore = 0;

level = 1;

function nextSequence() {
  randomNum = Math.floor(Math.random() * 4);

  currentSequence.push(colors[randomNum]);

  $(("#" + colors[randomNum])).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + colors[randomNum] + ".mp3");
  audio.play();

}



$(".btn").click(colorPicked);

function colorPicked(event) {
  if (currentSequence.length !== 0) {
    $(("#" + event.target.id)).animate({
      opacity: "70%"
    }, 100).animate({
      opacity: "100%"
    }, 100);

    var audio = new Audio("sounds/" + event.target.id + ".mp3");
    audio.play();

    answerSequence.push(event.target.id);
    if (answerSequence[answerSequence.length - 1] === currentSequence[answerSequence.length - 1]) {
      if (answerSequence.length === currentSequence.length) {
        level++;
        $("#level-title").text("Level " + level);
        setTimeout(nextSequence, 500);
        answerSequence = [];
      }
    } else {
      $("#level-title").text("Game Over. Press Any Key To Retry.");
      if(level  > highScore) {
        $("#high-score").text("High Score : "+level);
        highScore = level;
      }
      level = 1;
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over")
      },100);

      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      currentSequence = [];
      answerSequence = [];
    }
  }
}

function startGame(event) {
  if (currentSequence.length === 0) {
    $("#level-title").text("Level 1")
    nextSequence();
  }
}

$(document).keypress(startGame);
