// greetings(); //----- Outputs: "vidit2"

// var greetings = function() {
//   console.log("vidit1");
// }

// greetings(); //----- Outputs: "vidit1"

// function greetings() {
//   console.log("vidit2");
// }

// greetings(); //----- Outputs: "vidit1"

// const a = [,,,,];
// console.log(a.length); // 4
// console.log(a[0]); // undefined
// console.log(0 in a); // false

// Array a has 4 empty slots, so its length is 4.
// However, since these slots are empty (not even undefined),
// accessing any index will return undefined.
// The expression 0 in a returns false because there is no actual element at index 0, it's just an empty slot.

// const b = [1,,,5].length;
// console.log(b); // 4

// Array b has 4 elements: 1, (empty), (empty), and 5. 
// The empty slots are counted in the length, so the length is 4.
