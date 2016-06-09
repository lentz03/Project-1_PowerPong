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

  // Paddle settings
  var paddleSpeed  = 4;
  var paddleHeight = 70;
  var paddleWidth  = 15;

  //Controls
  var KEY = { UP: 38, DOWN: 40, W: 87, S: 83, Enter: 13};
  var pressedKeys = {
    "38": false,
    "40": false,
    "87": false,
    "83": false,
    "13": false
  };

  // System Settings
  var xMin = 0;
  var xMax = 800;
  var yMin = 0;
  var yMax = 500;

  // Sound effects
  var mySound = new buzz.sound( "css/sfx.wav",
    { preload: true, loop: false });
  var beep = new buzz.sound( "css/paddleA.wav",
    { preload: true, loop: false });
  var bop = new buzz.sound( "css/paddleB.wav",
    { preload: true, loop: false });
  var showme = new buzz.sound( "css/smwyg.mp3",
    { preload: true, loop: false });
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
      mySound.play();
      score2++;
      $('.score2').text(score2);
      //(score2 === winScore ){
      // #endgame
     // }
    }

    if (ballRight >= xMax) {
      horizontalMove = -horizontalMove;
      lastContact = "xMax";
      mySound.play();
      score1++;
      $('.score1').text(score1);
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
      beep.play();
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
      bop.play();
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

  var bindResetBtn = function () {
      $('#resetBtn').on('click', function () {
        clearInterval(gameloop);
        $('#ball').stop().remove();
        $('#endgame').hide();
        bindStart();
      })
    }

// Press Enter to start game
  var bindStart = function () {
      $(document).off('keypress').one('keypress', function(e){
        if (e.keyCode === 13) {
          showme.play();
          startGame();
        }
      });
    };



// Initialize these functions
var init = function () {
  bindStart();
  bindKeys();
  bindResetBtn();
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

  init();
});