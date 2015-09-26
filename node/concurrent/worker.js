var http = require('http');

function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    console.log(startTime);
    while (new Date().getTime() < startTime + milliSeconds);
};

http.createServer(function(req, res) {
    sleep(2000);  //等待3秒。
    res.end('1');
}).listen(4000);

console.log('listened 4000');
