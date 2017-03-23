var canvas = document.getElementById('canvas');
canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight;

var ctx = canvas.getContext('2d');

var isDrawing = false;
var lines = [];

document.onmousedown = function (e) {
    isDrawing = true;
    lines.push([]);
}

document.onmousemove = function (e) {
    if (!isDrawing) {
        return;
    }

    var x = e.clientX;
    var y = e.clientY;
    ctx.fillRect(x, y, 10, 10);
    lines[lines.length - 1].push({
        x: x,
        y: y
    });
    draw();
}

document.onmouseup = function (e) {
    isDrawing = false;
}

function draw() {
    ctx.beginPath();
    lines.forEach(function (line) {
        ctx.moveTo(line[0].x, line[0].y);
        for (var i = 1; i < line.length; i++) {
            ctx.lineTo(line[i].x, line[i].y);
        }
    });
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 10;
    ctx.shadowColor = 'red';
    ctx.shadowBlur = 10;
    ctx.stroke();
}
