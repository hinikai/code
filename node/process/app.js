var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {

    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        cluster.fork();
        console.log('worker ' + worker.process.pid + ' died');
    });

} else {
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World!');
        console.log('Worker #' + cluster.worker.id + ' make a response');
    }).listen(3000, '127.0.0.1');
    console.log('server');
}

