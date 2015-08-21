// 假设我们有一个模型来存储数据
var model = {};

// 然后我们对他进行观察
// 还可观察数组 prototype 对象属性
Object.observe(model, function(changes){

    console.log(changes);
    // 这个异步回调函数将会运行
    changes.forEach(function(change) {

        // 让我们获知变化
        // type: add、update、delete
        console.log(change.type, change.name, change.oldValue);

    });

});

for (var i = 0; i < 10; i++) {
    model[i]= 1;
}

function Circle(r) {
    var radius = r;

    var notifier = Object.getNotifier(this);
    function notifyAreaAndRadius(radius) {
        notifier.notify({
            type: 'update',
            name: 'radius',
            oldValue: radius
        })

        notifier.notify({
            type: 'update',
            name: 'area',
            oldValue: Math.pow(radius * Math.PI, 2)
        });
    }

    Object.defineProperty(this, 'radius', {
        get: function() {
            return radius;
        },
        set: function(r) {
            if (radius === r) return;
            notifyAreaAndRadius(radius);
            radius = r;
        }
    });

    Object.defineProperty(this, 'area', {
        get: function() {
            return Math.pow(radius, 2) * Math.PI;
        },
        set: function(a) {
            r = Math.sqrt(a)/Math.PI;
            notifyAreaAndRadius(radius);
            radius = r;
        }
    });
}

function observer(changes){
    changes.forEach(function(change, i){
        console.log(change);
    })
}

var circle = new Circle(5);
Object.observe(circle, observer);

circle.radius = 1;
circle.area = 10;
