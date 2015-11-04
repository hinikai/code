var canvas = document.getElementById('canvas');
canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight;

var ctx = canvas.getContext('2d');


ctx.lineWidth = 5;

// linear gradient from start to end of line
var grad= ctx.createLinearGradient(50, 50, 150, 150);
grad.addColorStop(0, "rgba(250, 250, 55, 0)");
grad.addColorStop(0.1, "rgba(250, 250, 55, 0.1)");
grad.addColorStop(0.5, "rgba(250, 250, 55, 1)");
grad.addColorStop(0.9, "rgba(250, 250, 55, 0.1)");
grad.addColorStop(1, "rgba(250, 250, 55, 0)");

ctx.strokeStyle = grad;

ctx.beginPath();
ctx.moveTo(50,50);
ctx.lineTo(150,150);

ctx.stroke();
