'use strict';

var doc = require('aws-sdk');
var dynamo = new doc.DynamoDB();

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
    var instanceName = event.instanceName;
    var iterator = event.iterator;      // Passed in as parameter from requestor.
    var generator = event.generator;    // Passed in as parameter from requestor.

    var c = Math.ceil(Math.log(iterator)/Math.log(36));
    var p = Math.pow(36,c);

    var range = [Math.floor((0.28*p)), Math.floor(0.48*p-0.28*p)];    // [min, delta]
    var generator = range[0] + Math.floor(Math.random() * range[1]);
    while (gcd(generator,p)!=1) generator = range[0] + Math.floor(Math.random() * range[1]);

    // TODO: I'm reading from the DB here just to test. This would be done in the ID generator function. 
    // TODO: This function would just return a valid generator. It's up to the caller to save it. 
    //       Basically, this function shouldn't access DynamoDB by the end of it. 

    var params = {
        TableName: 'instances',
        Key: { // a map of attribute name to AttributeValue for all primary key attributes
        
            "instanceName": { S: instanceName }
            // more attributes...

        },
        AttributesToGet: [ // optional (list of specific attribute names to return)
            'generator',
            // ... more attribute names ...
        ],
        ConsistentRead: false, // optional (true | false)
        ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
    };
    dynamo.getItem(params, function(err, data) {
        if (err) console.log(err); // an error occurred
        else console.log(data); // successful response
    });

    // The ID corresponding to the value of the iterator is determined by generator*iterator (mod p)
    // var id = ((generator*iterator)%p).toString(36);

    // console.log("iteration: " + iterator + "; id: " + id + "; generator: " + generator + "; p: " + p + "; gcd: " + gcd(generator,p));

    callback(null, generator);
};