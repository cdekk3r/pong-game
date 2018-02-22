// create table
var canvas = document.getElementById('table');
var context = canvas.getContext('2d');
var playerScore = 0;
var computerScore = 0;

function drawCanvas() {
    canvas.style.display= 'block';
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// Paddle constructor
function Paddle(x, y) {
   this.x = x;
   this.y = y;
   this.width = 10;
   this.height = 70;
   this.color = "#0000FF";
}

// Ball constructor
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 5;
  this.x_speed = 5;
  this.y_speed = 5;
}

var random = function() {
  return Math.floor((Math.random() * 6) + 3);
}

// Player and Computer constructors
function Player() {
   this.paddle = new Paddle(5, 152);
}

function Computer() {
   this.paddle = new Paddle(753, 152);
}

// Append render method to prototypes
Paddle.prototype.render = function() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
}

Player.prototype.render = function() {
    this.paddle.render();
};

Computer.prototype.render = function() {
    this.paddle.render();
};

Ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#F96";
    context.fill();
}

Ball.prototype.update = function(player, computer) {
    this.x += this.x_speed;
    this.y += this.y_speed;
    var leftEdge = this.x - 5;
    var rightEdge = this.x + 5;
    var topEdge = this.y - 5;
    var botEdge = this.y + 5;

    // bottom and top wall
    if (topEdge < 0 || botEdge > 384) {
        this.y_speed = -this.y_speed;
    }

    // left wall/paddle
    if (this.x < 0) {
        computerScore += 1;
        if (computerScore == 11) {
          // alert("Computer wins!");
        }
        return render();
    } else if (leftEdge <= player.paddle.x + player.paddle.width && topEdge <= player.paddle.y + player.paddle.height &&
                botEdge >= player.paddle.y && this.x >= player.paddle.x + player.paddle.width) {
        this.x_speed = -this.x_speed;
    } else if (topEdge <= player.paddle.y + player.paddle.height && botEdge >= player.paddle.y + player.paddle.height && this.x >= player.paddle.x &&
                this.x <= player.paddle.x + player.paddle.width) {
        this.y_speed = -this.y_speed;
    } else if (botEdge >= player.paddle.y && topEdge <= player.paddle.y && rightEdge >= player.paddle.x &&
                this.x <= player.paddle.x + player.paddle.width) {
        this.y_speed = -this.y_speed;
    }

    // right wall/paddle
    if (rightEdge > 763) {
        playerScore += 1;
        if (playerScore == 11) {
          alert("Player wins!");
        }
    } else if (rightEdge >= computer.paddle.x && topEdge <= computer.paddle.y + player.paddle.height &&
                botEdge >= computer.paddle.y && this.x <= computer.paddle.x) {
        this.x_speed = -this.x_speed;
    } else if (botEdge >= computer.paddle.y && topEdge <= computer.paddle.y && rightEdge >= computer.paddle.x &&
                leftEdge <= computer.paddle.x + computer.paddle.width) {
        this.y_speed = -this.y_speed;
    } else if (topEdge <= computer.paddle.y + computer.paddle.height && botEdge >= computer.paddle.y + computer.paddle.height && rightEdge >= computer.paddle.x &&
                leftEdge <= computer.paddle.x + computer.paddle.width) {
        this.y_speed = -this.y_speed;
    }
}


Computer.prototype.update = function(ball) {
    var distance = ball.y - (this.paddle.y + this.paddle.width/2);

    if (ball.x < 0 || ball.x > 768) {
      this.paddle.y = 152;
      return;
    }

    if (distance > 0) {
      distance = 7;
    } else {
      distance = -7;
    }

    this.paddle.move(distance);
}

// Apprend move method to paddle prototype
Paddle.prototype.move = function(y) {
    this.y += y;
    this.y_speed = 5;
    if (this.y < 0) {
        this.y = 0;
        this.y_speed = 0;
    } else if (this.y > 304) {
        this.y = 304;
        this.y_speed = 0;
    }
}

Paddle.prototype.update = function() {
    for (var key in keyPressed) {
      var val = Number(key);

      if (val == 38) {
          player.paddle.move(-5);
      }

      if (val == 40) {
          player.paddle.move(5);
      }
  }
}

var update = function() {
    player.paddle.update();
    ball.update(player, computer);
    computer.update(ball);
}

// Create objects from the constructors
var player = new Player();
var computer = new Computer();
var ball = new Ball(384,192);

// Render elements
var render = function() {
  drawCanvas();
  player.render();
  computer.render();
  ball.render();
};


// Animation
var animate = window.requestAnimationFrame ||
                  function(callback) {window.setTimeout(callback, 10000/60) };

// Calls render fuction
window.onload = function() {
  render();
}

var step = function() {
    update();
    render();
    requestId = animate(step);
}

var keyPressed = {}
// key listener
window.addEventListener("keydown", function(event) {
    keyPressed[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
    delete keyPressed[event.keyCode];
});
