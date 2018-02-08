// create table
var canvas = document.getElementById('table');
var context = canvas.getContext('2d');

canvas.style.display= 'block';
context.fillRect(0, 0, canvas.width, canvas.height);

// Paddle constructor
function Paddle(x, y) {
   this.x = x;
   this.y = y;
   this.width = 15;
   this.height = 80;
   this.color = "#0000FF";
}

// Ball constructor
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 5;
}

// Player and Computer constructors
function Player() {
   this.paddle = new Paddle(10, 150);
}

function Computer() {
   this.paddle = new Paddle(743, 150);
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

// Create objects from the constructors
var player = new Player();
var computer = new Computer();
var ball = new Ball(384,192);

// Render elements
var render = function() {
  player.render();
  computer.render();
  ball.render();
};

// Calls render fuction
window.onload = function() {
  render();
}
