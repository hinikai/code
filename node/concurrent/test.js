var fork = require("child_process").fork;
var cpus = require("os").cpus(); //获取cpu核数

console.log('cpu', cpus.length);

for (var i = 0; i < cpus.length; i++) {
    fork('./worker.js');
}
