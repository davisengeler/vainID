// This code creates and validates random, ideal generators based on the iterator.
// It's what enables the "procedurally generated" nature of my algorithm to function. 
// 
// Inputs...
//  - instanceName: Identifyer for this logical instance. 
//	- iterator: The current iteration (how many IDs have been used).
//
// Outputs...
//  - Validated random generator within ideal range for required capacity. 

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

// Take in these initial values from the requestor.
var instanceName = "lytnit"		//event.instanceName;
var iterator = 12345;			//event.iterator;

// Let `c` be the number of characters required to map the iterator. 
// Let `p` be the number of unique IDs obtainable by `c` characters.
var c = Math.ceil(Math.log(iterator)/Math.log(36));
var p = Math.pow(36,c);

// Define an ideal sample range for generator candidates. 
var range = [Math.floor((0.28*p)), Math.floor(0.48*p-0.28*p)]; // [0:min, 1:delta]

// Generate until valid. Don't hate me for this line. I needed the scope, but also wanted a 2-liner. lol
var generator; do { generator = range[0] + Math.floor(Math.random() * range[1]) }
while (gcd(generator,p)!=1);

// Log the results to the console for testing. >>> It should look like "GCD ( generator , p ) = 1".
console.log("GCD( " + generator + " , " + p + " ) = " + gcd(generator,p));