// create table
var table_canvas = document.getElementById('table');
var table_context = table_canvas.getContext('2d');

table_canvas.style.display= 'block';
table_context.fillRect(0, 0, table_canvas.width, table_canvas.height);

// var player = document.getElementById('player');
// var player_context = player.getContext('2d');
//
// player_context.fillStyle = "blue";
// player_context.fillRect(0, 0, player.width, player.height);

// Paddle constructor
function Paddle(x, y) {
   this.x = x;
   this.y = y;
   this.width = 15;
   this.height = 80;
   this.color = "#0000FF";
}

Paddle.prototype.render = function() {
   table_context.fillStyle = this.color;
   table_context.fillRect(this.x, this.y, this.width, this.height);
}

function Player() {
   this.paddle = new Paddle(10, 180);
}

function Computer() {
   this.paddle = new Paddle(748, 180);
}

Player.prototype.render = function() {
   this.paddle.render();
};

Computer.prototype.render = function() {
   this.paddle.render();
};

var player = new Player();
var computer = new Computer();

var render = function() {
  player.render();
  computer.render();
};

window.onload = function() {
  render();
}
