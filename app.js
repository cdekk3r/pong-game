var table_canvas = document.getElementById('table');
var table_context = table_canvas.getContext('2d');

table_canvas.style.display= 'block';
table_context.fillRect(0, 0, table_canvas.width, table_canvas.height);

var player = document.getElementById('player');
var player_context = player.getContext('2d');

player_context.fillStyle = "blue";
player_context.fillRect(0, 0, player.width, player.height);

var render = function() {
  context.fillStyle = "#FF00FF";
  context.fillRect(0, 0);
  player.render();
};

function Player() {
   this.paddle = new Paddle(0, 192);
}

function Computer() {
   this.paddle = new Paddle(768, 192);
}

function Paddle(x, y) {
   this.x = x;
   this.y = y;
   this.width = 20;
   this.height = 50;
   this.color = "#FFFFFF";
}

Paddle.prototype.render = function() {
   context.fillStyle = "#FFFFFF";
   context.fillRect(this.x, this.y, this.width, this.height);
}

Player.prototype.render = function() {
   this.paddle.render();
};

Computer.prototype.render = function() {
   this.paddle.render();
};