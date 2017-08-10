'use strict';

function gcd(a,b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {var temp = a; a = b; b = temp;}
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}

exports.handler = (event, context, callback) => {
    var instanceName = "lytnit" //event.instanceName;
    var iterator = 12345; 		//event.iterator;

    var c = Math.ceil(Math.log(iterator)/Math.log(36));
    var p = Math.pow(36,c);

    var range = [Math.floor((0.28*p)), Math.floor(0.48*p-0.28*p)];    // [0:min, 1:delta]
    var generator;

    // 
    do { generator = range[0] + Math.floor(Math.random() * range[1]) }
    while (gcd(generator,p)!=1);

    console.log("GCD( " + generator + " , " + p + " ) = " + gcd(generator,p));

    callback(null, generator);
};