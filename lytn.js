// ==============================================================
// This code accepts a new link that a user desires be shortened. 
// It returns the final shortened link. 
// ==============================================================

var newLink = "https://www.google.com/"; // Get this from parameters.
// TODO: Sanitize/validate the link.

// Grab instance metrics from DB
var instanceName = "lytnit";
// TODO: Connect to the DB to grab the instance's current `iterator` and `generator`.
var localIterator = 15;   // We'll manipulate this value and save it to the DB later. Think of it as a local copy. 
var generator = 13;  // This will hold the value from the DB.

// The following is used to increase the capacity when the usage has exceeded the limits for the current number of digits. 
// Let `c` be the number of characters required to map the iterator. 
// Let `p` be the number of unique IDs obtainable by `c` characters.
var c = Math.ceil(Math.log(localIterator)/Math.log(36));
var p = Math.pow(36,c);

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