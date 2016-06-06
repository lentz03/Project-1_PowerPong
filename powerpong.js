//Players 1 & 2
var player1 = $("#paddleA")
var player2 = $("#paddleB")

//Controls
var KEY = { UP: 38, DOWN: 40, W: 87, S: 83 };
var pressedKeys = [];

// Score needed to win game
var winScore = 5;

// Each players starting score
var score1 = 0
var score2 = 0

// Store in for keyboard de knowledge
$(function() {
  $(document).keydown(function(e) {
    pressedKeys[e.which] = true;
  });
  $(document).keyup(function(e) {
    pressedKeys[e.which] = false;
  });

  // Set main loop frame rate (60 fps the best)
  setInterval(gameLoop, 1000 / 60);
});

// Main loop of the game
function gameLoop() {
  movePaddles();
}

// Control movement of paddles based on keyboard events
function movePaddles() {
  var paddleSpeed = 5;

  // Check keyboard events
  if (pressedKeys[KEY.W]) {
    // Move the paddle A up
    var top = parseInt($("#paddleA").css("top"));
    if (top - 6 >= 0) {
      $("#paddleA").css("top", top - paddleSpeed);
    }
  }


// Control keys

  if (pressedKeys[KEY.S]) {
    // Move the paddle A down
    var top = parseInt($("#paddleA").css("top"));
      $("#paddleA").css("top", top + paddleSpeed);
    }






  if (pressedKeys[KEY.UP]) {
    // Move the paddle B up
    var top = parseInt($("#paddleB").css("top"));
    if (top - 6 >= 0) {
      $("#paddleB").css("top", top - paddleSpeed);
    }
  }





  if (pressedKeys[KEY.DOWN]) {
    // Move the paddle B down
    var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top", top + paddleSpeed);
    }
}
