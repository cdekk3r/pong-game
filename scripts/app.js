// create table
var canvas = document.getElementById('table');
var context = canvas.getContext('2d');

function drawCanvas() {
    canvas.style.display= 'block';
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// Paddle constructor
function Paddle(x, y) {
   this.x = x;
   this.y = y;
   this.width = 15;
   this.height = 80;
   this.color = "#0000FF";
   this.speed = 5;
}

// Ball constructor
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 5;
  this.x_speed = 3;
  this.y_speed = 3;
}

// Player and Computer constructors
function Player() {
   this.paddle = new Paddle(5, 152);
}

function Computer() {
   this.paddle = new Paddle(748, 152);
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
    context.fillStyle = "#0000FF";
    context.fill();
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

// Calls render fuction
window.onload = function() {
   step();
}

// Animation
var animate = window.requestAnimationFrame ||
                  function(callback) {window.setTimeout(callback, 10000/60) };

var step = function() {
   update();
   render();
   animate(step);
}

var keyPressed = {}
// key listener
window.addEventListener("keydown", function(event) {
    keyPressed[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
    delete keyPressed[event.keyCode];
});
