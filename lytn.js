// ==============================================================
// This code accepts a new link that a user desires be shortened. 
// It returns the final shortened link. 
// ==============================================================

var newLink = "https://www.google.com/"; // Get this from parameters.
// TODO: Sanitize/validate the link.

// Grab instance metrics from DB
var instanceName = "lytnit";
// TODO: Connect to the DB to grab the instance's current `iterator` and `generator`.
var localIterator = 14+1;   // We'll manipulate this value and save it to the DB later. Increment it here.  
var generator = 13;  // This will hold the value from the DB.

// The following is used to select an updated generator after the ID length increases by 1 digit. 
// Let `c` be the number of characters required to map the iterator. 
// Let `p` be the number of unique IDs obtainable by `c` characters.
var c = Math.ceil(Math.log(localIterator)/Math.log(36));
var p = Math.pow(36,c);
if (generator/p < 0.25) {
    // TODO: Call function for the code found in `generator.js` to
    // create and validate a new generator. Then save it to the 
    // "instance data" in the DB. 
    console.log("update generator");
}

// !TODO!: 
//  saveLink(id, newLink): Returns false for collision. Returns true if saved successfully.
//      - Pull current instance data from DB: `DB.iterator`.
//      - If (localIterator < `DB.iterator`), then we're in a "collision." Simply
//          return false in that case. The loop that called it handles the rest.
//      - If (localIterator > `DB.iterator), then everything is good. Add a new item
//          to the DB with `id` and `newLink`. Return true.

// Generate and save the link with a unique ID. 
var id; do { id = (localIterator++)*generator; }
while (!saveLink(id, newlink));

// Logging the final link to the console for testing.
console.log("Saved for ID: " +  id);