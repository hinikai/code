
function Timer(options) {

    options = options || {};
    this.options = options;
    this.startTime = options.startTime || new Date('2015-08-20 10:11');
    this.endTime = options.endTime || new Date('2015-08-20 17:11');
    this.currentTime = this.startTime;
    this.animateTimer();

}

Timer.prototype.start = function() {
    this.flag = true;
}

Timer.prototype.stop = function() {
    this.flag = false;
}

Timer.prototype.animateAction = function() {
    this.currentTime.setTime(this.currentTime.getTime() + 1000);
    console.log(this.currentTime);
}

Timer.prototype.animateTimer = function() {

    if (this.flag) {
        this.animateAction();
    }

    var me = this;
    requestAnimationFrame(function() {
        me.animateTimer();
    });

}

var timer = new Timer();
timer.start();

