$(document).ready(function(){
  // Game Loop
  var gameloop = null;

  //Players 1 & 2
  var $paddleA = $("#paddleA")
  var $paddleB = $("#paddleB")

  //Ball
  var $ball          = $("#ball");
  var ballHeight     = 40;
  var ballWidth      = 40
  var verticalMove   = 5; //vertical  speed
  var horizontalMove = 5; //horizontal speed
  var lastContact    = '';
  var ballSize       = 40;
  // Score needed to win game
  var winScore = 5;

  // Each players starting score
  var score1 = 0
  var score2 = 0

  //Spawn point for the ball //make into a function and call
  var x =369;
  var y =200;

  var originalX = x
  // Counter
  y += verticalMove;
  x -= horizontalMove;


  if (x < 0) {
      score2 += 1;
      x = originalX;
      y = ballWidth;
      vertSpeed = originalVS;
      horizSpeed = originalHS;
  }
  if (x > 400) {
      score1 += 1;
      x = originalX;
      y = bY;
      vertSpeed = originalVS;
      horizSpeed = originalHS;
  }

  if (y < ballSize * 2) {
      vertSpeed *= -1;
  }
  if (y > 400 -ballSize * 2) {
      vertSpeed *= -1;
  }

  var winScreen = function () {
    if (score1 > score2) {
            fill(255, 0, 0);
            text(player1 + " won!!!", 50, 200);
            text(comment, 10, 250);
        }
        if (score2 > score1) {
            fill(255, 0, 0);
            text(player2 + " won!!!", 50, 200);
            text(comment, 10, 250);
        }
      };

      // Winning!
          if (score1 > winScore - 1) {
              winScreen();
              score2 = 0;
          }
          if (score2 > winScore - 1) {
              winScreen();
              score1 = 0;
          };

  // Paddle settings
  var paddleSpeed  = 4;
  var paddleHeight = 70;
  var paddleWidth  = 15;

  //Controls
  var KEY = { UP: 38, DOWN: 40, W: 87, S: 83 };
  var pressedKeys = {
    "38": false,
    "40": false,
    "87": false,
    "83": false
  };

  // System Settings
  var xMin = 0;
  var xMax = 800;
  var yMin = 0;
  var yMax = 500;

  //Ball positioning
  var moveBall = function(){
    // boundary collision
    var position  = $ball.position();

    var ballTop   = position.top;
    var ballBot   = position.top + ballHeight;
    var ballLeft  = position.left;
    var ballRight = position.left + ballWidth;

    if (ballTop <= yMin) {
      verticalMove = -verticalMove;
      lastContact = "yMin";
    }

    if (ballBot >= yMax ) {
      verticalMove = -verticalMove;
      lastContact = "yMax";
    }

    if (ballLeft <= xMin) {
      horizontalMove = -horizontalMove;
      lastContact = "xMin";
    }

    if (ballRight >= xMax) {
      horizontalMove = -horizontalMove;
      lastContact = "xMax";
    }

    // paddleA collision
    var paddleAPosition = $paddleA.position();
    var paddleATop   = paddleAPosition.top;
    var paddleABot   = paddleAPosition.top + paddleHeight;
    var paddleALeft  = paddleAPosition.left;
    var paddleARight = paddleAPosition.left + paddleWidth;

    if (ballLeft <= paddleARight && ballRight >= paddleALeft && ballTop <= paddleABot && ballBot >= paddleATop && lastContact !== 'paddleA') {
      horizontalMove = -horizontalMove;
      lastContact = 'paddleA';
    }

    // paddleB collision
    var paddleBPosition = $paddleB.position();
    var paddleBTop   = paddleBPosition.top;
    var paddleBBot   = paddleBPosition.top + paddleHeight;
    var paddleBLeft  = paddleBPosition.left;
    var paddleBRight = paddleBPosition.left + paddleWidth;

    if (ballLeft <= paddleBRight && ballRight >= paddleBLeft && ballTop <= paddleBBot && ballBot >= paddleBTop && lastContact !== 'paddleB') {
      horizontalMove = -horizontalMove;
      lastContact = 'paddleB';
    }

    $ball.css({
      top: position.top + verticalMove,
      left: position.left + horizontalMove
    });
  };

  // Control movement of paddles based on keyboard events
  var movePaddles =  function() {
    // Check keyboard events

    // Move the paddle A up
    if (pressedKeys[KEY.W]) {
      var position = $paddleA.position();
      var top = position.top;
      if (top >= 0) {
        $paddleA.css("top", top - paddleSpeed);
      }
    }

    // Move the paddle A down
    if (pressedKeys[KEY.S]) {
      var position = $paddleA.position();
      var top = position.top;
      var bot = top + paddleHeight;
      if (bot <= 500) {
        $paddleA.css("top", top + paddleSpeed);
      }
    }

    // Move the paddle A up
    if (pressedKeys[KEY.UP]) {
      var position = $paddleB.position();
      window.debug = position
      var top = position.top;
      if (top >= 0) {
        $paddleB.css("top", top - paddleSpeed);
      }
    }

    // Move the paddle A down
    if (pressedKeys[KEY.DOWN]) {
      var position = $paddleB.position();
      var top = position.top;
      var bot = top + paddleHeight;
      if (bot <= 500) {
        $paddleB.css("top", top + paddleSpeed);
      }
    }
  }

  // Store in for keyboard de knowledge
  var bindKeys = function() {
    $(document).on('keydown', function(e) {
      pressedKeys[e.keyCode] = true;
    });

    $(document).on('keyup', function(e) {
      pressedKeys[e.keyCode] = false;
    });
  };

  // Main loop of the game
  var startGame = function () {
    bindKeys();
    // Set main loop frame rate (60 fps the best)
    gameloop = setInterval(function () {
      moveBall();
      movePaddles();
    }, 1000 / 60);
  };

  startGame();
});