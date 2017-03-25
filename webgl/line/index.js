var canvas = document.getElementById('webgl');
canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight;

var gl = getWebGLContext(canvas);
 
 
var VSHADER_SOURCE =
   'attribute vec4 a_Position;\n' +
   'void main() {\n' +
   '  gl_Position = a_Position;\n' +
   '  gl_PointSize = 2.0;\n' +
   '}\n';
 
var FSHADER_SOURCE =
   'precision mediump float;\n' +
   'uniform vec4 u_FragColor;\n' +
   'void main() {\n' +
   '  gl_FragColor = u_FragColor;\n' +
   '}\n';
 
 
initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);


gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

//gl.clearColor(0 / 255, 73 / 255, 129 / 255, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

var vertexColorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
     
var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(a_Position);

var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
 
function getX(x) {
    return (x - canvas.width / 2 ) / (canvas.width / 2);
}

function getY(y) {
    return (canvas.height / 2 - y) / (canvas.height / 2);
}

//get the context
function getWebGLContext(canvas, err) {
   // bind err
   if (canvas.addEventListener) {
       canvas.addEventListener("webglcontextcreationerror", function(event) {
           err(event.statusMessage);
       }, false);
   }
   //create context
   var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
   var context = null;
   for (var ii = 0; ii < names.length; ++ii) {
       try {
           context = canvas.getContext(names[ii], err);
       } catch (e) {}
       if (context) {
           break;
       }
   }
   return context;
};
 
//init shader
function initShaders(gl, vshader, fshader) {
   var program = createProgram(gl, vshader, fshader);
   if (!program) {
       console.log('Failed to create program');
       return false;
   }
 
   gl.useProgram(program);
   gl.program = program;
 
   return true;
}
 
 
//create program
function createProgram(gl, vshader, fshader) {
   // Create shader object
   var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
   var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
   if (!vertexShader || !fragmentShader) {
       return null;
   }
 
   // Create a program object
   var program = gl.createProgram();
   if (!program) {
       return null;
   }
 
   // Attach the shader objects
   gl.attachShader(program, vertexShader);
   gl.attachShader(program, fragmentShader);
 
   // Link the program object
   gl.linkProgram(program);
 
   // Check the result of linking
   var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
   if (!linked) {
       var error = gl.getProgramInfoLog(program);
       console.log('Failed to link program: ' + error);
       gl.deleteProgram(program);
       gl.deleteShader(fragmentShader);
       gl.deleteShader(vertexShader);
       return null;
   }
   return program;
}
 
//loadShader
function loadShader(gl, type, source) {
   // Create shader object
   var shader = gl.createShader(type);
   if (shader == null) {
       console.log('unable to create shader');
       return null;
   }
 
   // Set the shader program
   gl.shaderSource(shader, source);
 
   // Compile the shader
   gl.compileShader(shader);
 
   // Check the result of compilation
   var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
   if (!compiled) {
       var error = gl.getShaderInfoLog(shader);
       console.log('Failed to compile shader: ' + error);
       gl.deleteShader(shader);
       return null;
   }
 
   return shader;
}



var url = "bj_taxi_min";
console.time('download');
$.get(url).done(function(rs) {
    console.timeEnd('download');
    console.time('parse');
    rs = rs.split("\n");
    var lines = [];
    var zoom = 11;
    var mcCenter = {
        x: 12957908,
        y: 4826826,
    };
    var mcLeft = {
        x: mcCenter.x - canvas.width / 2 * Math.pow(2, 18 - zoom),
        y: mcCenter.y + canvas.height / 2 * Math.pow(2, 18 - zoom)
    }
    for (var i = 0; i < rs.length; i++) {
        var geo = [];
        var line = rs[i].split(";");
        for (var j = 0; j < line.length; j++) {
            var tmp = line[j].split(',');
            tmp[0] = getX((tmp[0] - mcLeft.x) / Math.pow(2, 18 - zoom));
            tmp[1] = getY((mcLeft.y - tmp[1]) / Math.pow(2, 18 - zoom));
            geo.push(tmp);
        }
        lines.push(geo);
    }
    console.timeEnd('parse');

    console.time('draw');
    gl.uniform4f(u_FragColor, 0.2, 0.2, 1, 0.02);
    gl.uniform4f(u_FragColor, 1.0, 0.1, 0.1, 0.05);
    for (var i = 0; i < lines.length; i++) {
        var points = [];
        var line = lines[i];
        for (var j = 0; j < line.length; j++) {
            points.push(line[j][0]);
            points.push(line[j][1]);
        }
        var verticesData = new Float32Array(points);
         
        gl.bufferData(gl.ARRAY_BUFFER, verticesData, gl.STATIC_DRAW);

        gl.lineWidth(3.001);
        gl.drawArrays(gl.LINE_STRIP, 0, line.length);
    }
    console.timeEnd('draw');

});
