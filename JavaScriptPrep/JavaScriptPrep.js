// Javascript is a single threaded, non-blocking, asynchronous concurrent language.  // it is synchronous because it executes code line by line.

// What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?

// Advantages

// 1) Static Typing
// 2) Language Features
// 3) Code Organization
// 4) Code Maintainablity

// Disadvantages
// 1) Learning Curve
// 2) Compilation Overhead
// 3) Debugging Complexity 

// this keyword refers to the object.
// The object we are refering to depends on where we are invoking the keyword.

// proto interheritance
// const company={
//     name:"Vidit",
//     pay:function(){
//         console.log("Paying");
//     }
// }

// const employee={
//     id:1,
//     work:function(){
//         console.log("Working");
//     }
// }

// employee.__proto__=company;
// employee.pay();


// null vs undefined vs undeclared

// null
// var vidit=null;
// null basically reperesents absense of any object value.It is primitive value.
// It is assinged to variable to signify that it has no significant value.

// undeclared
// A vairable being used without being formally declared is called undeclared.
// When we try to access such variables then we will get an error.
// ReferenceError: undeclaredVariable is not defined
// console.log(undeclaredVariable);


// undefined
// It is a primitive value in javascript and it is a special value when the variable is declared but not initalized.
// let myVar;
// console.log(myVar); // Outputs: undefined

// Closures

// A closure is a fundamental concept in JavaScript, and it occurs when a function is defined
// within another function, allowing the inner function to access the variables and parameters
// of the outer (enclosing) function, even after the outer function has finished executing.

// function outerfunction(){
//      let outerVariable="I am from outer function";
//      function innerfucntion(){
//          console.log(outerVariable);
//      }
//      return innerfucntion;
//  }
//  let closureExample=outerfunction();
//  closureExample();

// Why and how closures are useful
// 1) Encapsulation
// 2) Data Privacy
// 3) Callback functions
// 4) Functional Programming


// Iterating Over Objects

//const myObject={1:"Vidit",2:"is",3:"pro"}

// For in loop

// for(let key in myObject){
//     console.log(key,myObject[key]);
// }

// Object.keys(), Object.values(), Object.entries()

// Object.keys(myObject).forEach(key=>console.log(key,myObject[key]));
// Object.values(myObject).forEach(value=>console.log(value));
// Object.entries(myObject).forEach(([key,value])=>console.log(key,value));

// Iterating over Array Items;

// const myArr=[1,2,3];

// For Loop

// for(let i=0;i<myArr.length;i++){
//     console.log(myArr[i]);
// }

// For Each

// myArr.forEach(item=>console.log(item));

// for of Loop

// for(let item of myArr){
//     console.log(item);
// }

// map
//It creates a new array by applying operations to the elements of current array

// const newArr=myArr.map(item=>item*2);
// console.log(newArr);

// Anonymous

// Anonymous functions, also known as lambda functions or function expressions, are functions that 
// are defined without a name. They are often used in scenarios where a small, one-time function 
// is needed, and there's no need to give it a separate identity. 

// Callback Functions
// Callback functions are functions that are passed as arguments to other functions and are executed
// after a certain event or condition is met. They are commonly used in asynchronous programming, 
// event handling, and functional programming paradigms.

// function dividedByHalf(sum) {
//   return sum/2;
// }

// function multiplyByTwo(sum) {
//   return sum*2;
// }

// function getSum(a,b,callback) {
//   const sum = a + b;
//   callback(sum);
// }

// getSum(10, 20, dividedByHalf); // Outputs: 15
// getSum(10, 20, multiplyByTwo); // Outputs: 60

// const numbers=[1,2,3,4,5];

// const squaredNumbers=numbers.map(item=>item*item);
// console.log(squaredNumbers);

// Event Handlers
// document.getElementById('myButton').addEventListener('click', function () {
//  alert('Button clicked!');
// });

// IIFE
// (function(){
//     console.log("IIFE Executed");
// })();

//(function (val){
//  console.log(val);
// })("Hello");

// Higher Order Functions

// const result=[1,2,3,4].reduce(function(acc,num){return acc+num;},0);

// const result=[1,2,3,4].reduce((key,acc)=>acc+key);
// console.log(result);

// Dynamic Function Creation

// function createMultiplier(factor){
//     return function(number){
//         return number*factor;
//     }
// }

// const double=createMultiplier(15);
// console.log(double(2));

// Native Objects Vs 

// Native objects, also known as built-in objects, are part of the JavaScript language specification. 
// They are provided by the ECMAScript standard and are available in any JavaScript environment.

// eg-> Object, Array, Function, String, Number, Date, RegEx

// let myArray = [1, 2, 3];
// let myString = "Hello, World!";

// Host Objects
// Host objects are provided by the environment in which JavaScript is running, 
// such as a web browser or a server-side JavaScript environment (e.g., Node.js).
// Examples -> window, document, XMLHttpRequest, console

// Explain the difference between: function Person(){}, var person = Person(), and var person = new Person()?

// function Person(){}
// This is a function declaration that defines a function named Person.
// It does not create an instance of an object; it merely defines the function that can be used as a constructor.

// var person = Person();:
// This line calls the Person function but does not use the new keyword.
// The function is executed, and the result is assigned to the variable person.
// However, since the function is not called with new, it does not create an instance of an object.
// Instead, it might return a value explicitly or undefined if there's no explicit return.

// var person = new Person();:
// This line creates a new instance of an object using the Person function as a constructor.
// The new keyword is crucial here, as it indicates that a new object should be instantiated,
// and the function should be treated as a constructor.
// The person variable holds a reference to the newly created instance.

// Explain the differences on the usage of foo between function foo() {} and var foo = function() {}

// function foo() {}
// Function declarations are hoisted to the top of their containing scope. This means that you can call the function before it's declared in the code.

// var foo = function() {}
// Function declarations are available throughout the entire scope in which they are declared.
// Function expressions are also hoisted, but only the variable declaration is hoisted, not the assignment.

// Function.apply vs Function.call

// function myFunction(a1,a2){
//     console.log(this,a1,a2);
// }

// const context={prop:"Hello"};
// myFunction.call(context,"World","!");

// function myFunction(a1,a2){
//     console.log(this,a1,a2);
// }

// const context={prop:"Hello"};
// myFunction.apply(context,["World","!"]);

// Function.prototype.bind

// function greet(message){
//     console.log(`${message},${this.name}`);
// }

// const person={name:'Vidit'}
// const greetPerson=greet.bind(person,"Hello");
// greetPerson();

//Currying

// Currying is a functional programming concept in which a function is transformed
// into a sequence of functions, each taking a single argument. The curried function
// allows you to create more specialized functions by partially applying arguments. 

// function Volume(l,b,h){
//   return l*b*h;
// }
// console.log(Volume(2,3,4));

// function Volume(l){
//   return function(b){
//     return function(h){
//       return l*b*h;
//     }
//   }
// }

// console.log(Volume(2)(3)(4));

// Feature Detection vs Feature Inference vs User Agent(UA) String

// Feature Detection
// Feature Detection involves checking whether a specific browser feature is supported by testing for the
// existence of that feature or property in the browser's environment.

// Feature Inference
// Feature Inference involves making an educated guess about the browser's capabilties based on the presence of other features.

// User Agent String
// The User Agent (UA) string is a string sent by a browser to identify itself to the server. 
// Developers sometimes parse this string to infer information about the browser.

// Explain Hoisting
// Hoisting is a behavior of Javascript when a variable and function declarations are moved to the top
// of their containing scope during the compilation phase before the code is executed.

// console.log(myVar); // Outputs: undefined
// var myVar = 5;
// console.log(myVar); // Outputs: 5

// console.log(myVar); // Outputs: undefined
// var myVar = 5;

// console.log(myLet); // Throws ReferenceError: Cannot access 'myLet' before initialization
// let myLet = 10;

// foo(); // Outputs: "Hello, I am foo!"
// function foo() {
//  console.log("Hello, I am foo!");
//}

// data Attribute
// In HTML, the data-* attributes provide a way to store custom data private to the page or application. 
// These attributes can be added to any HTML element and are accessible via JavaScript. They are often 
// used to store information that is not visible or relevant for styling but is useful for scripting or 
// interactivity.

// <div data-user-id="123" data-user-name="john_doe" data-is-admin="true"></div>

// Type Coresion
// Type coercion in JavaScript refers to the automatic conversion of one data type to another.

// String and Number:
// var result = "3" + 2; // "32" (string concatenation)

// Number and Boolean
// var result = 5 * "2"; // 10 (string "2" is coerced to a number)

// Boolean and Number
// var result = true + 2; // 3 (true is coerced to 1 in a numeric context)

// Common Pitfalls of Relying on Type Coercion:

// 1) Implicit Coercion in Equality Comparisons:
// "5" == 5; // true (string "5" is coerced to a number)

// 2) Unexpected Arithmetic Operations:
// var result = "3" - 2; // 1 (string "3" is coerced to a number)

// 3) Falsy Values:
//  if (0 == false) {
  // This block is executed, as 0 is coerced to false in a boolean context
//}

// 4) Unexpected Concatenation:
// var result = "3" + 2; // "32" (string concatenation)

// Event Bubbling
// Event bubbling is a phase in the event propagation model in the Document Object Model (DOM) of web browsers. 
// In the event bubbling phase, an event starts from the target element that triggered the event and then bubbles 
// up through its ancestors in the DOM hierarchy. This allows parent elements to have an opportunity to respond to the event.

// event bubbling process:
// 1) Event Triggering:

// An event is triggered on a specific target element, such as a button being clicked or a form being submitted.
// 2) Event Capturing Phase:

// The event starts its journey from the root of the DOM tree and travels down to the target element. This is known as the capturing phase. During this phase, the ancestors of the target element have the opportunity to capture the event before it reaches the target.
// 3) Target Element:

// The event reaches the target element, and any event handlers attached to the target are executed.
// 4) Event Bubbling Phase:

// After the event has been processed at the target, it starts bubbling up through the ancestors in the reverse order of the DOM hierarchy. This is the event bubbling phase.
// 5) Ancestor Elements:

// During the bubbling phase, each ancestor element has the opportunity to handle the event. Event handlers on ancestor elements can respond to the event, providing an opportunity for delegation or handling events at a higher level.
// 6) Document Root:

// The event eventually reaches the document root.

//What is the difference between an "attribute" and a "property"?

//<input type="text" value="Hello" readonly class="input-field">

// Attribute
// 1) An attribute is a key-value pair that is part of an HTML element's markup.
// 2) Attributes provide additional information about an element and are included in the opening tag of an HTML element.

// Accessing attribute value
// const inputElement = document.querySelector('input');
// const readOnlyValue = inputElement.getAttribute('readonly');

// Modifying attribute
// inputElement.setAttribute('readonly', 'true');

// Properties
// 1) A property is a key-value pair that represents the current state or value of an HTML element in the DOM.
// 2) Properties can be dynamically changed or accessed using JavaScript.

// Accessing property value
// const inputElement = document.querySelector('input');
// const readOnlyValue = inputElement.readOnly;

// Modifying property
// inputElement.readOnly = true;

// What is the difference between == and ===?
// 5 == "5";   // true (String "5" is coerced to a Number)
// true == 1;   // true (Boolean true is coerced to a Number)
// null == undefined;   // true (both null and undefined are considered equal)

// 5 === "5";   // false (Number is not equal to String)
// true === 1;   // false (Boolean is not equal to Number)
// null === undefined;   // false (strict equality considers different types unequal)

// Same Origin Policy
// 1) Security 
// 2) Data Privacy
// 3) Prevent Cross Site Request Forgery 
// 4) Isolating 

// macrotask vs microtask

// Macrotasks
// Macrotasks are larger units of work that are scheduled to be executed after the current execution context completes.

// 1) setTimeout
// 2) setInterval
// 3) setImmediate (Node.js only)
// 4) I/O operations (e.g., reading files, network requests)
// 5) UI rendering tasks

// Microtasks
// Microtasks are smaller units of work that are scheduled to be executed immediately after the current execution context completes and before the next macrotask is processed.

// 1) Promise callbacks (e.g., .then(), .catch(), .finally())
// 2) MutationObserver callbacks
// 3) process.nextTick (Node.js only)

// Why is it called a Ternary operator, what does the word "Ternary" indicate?
// The term "ternary" in the context of programming languages and operators refer
// to an operation or operator that takes three operands.

// var x=5;
// var result = x<0 ? "Hello bro": "oda bhai";
// console.log(result);

// Strict mode is a feature in JavaScript that was introduced in ECMAScript 5 (ES5) to help 
// developers write more reliable and maintainable code by catching common coding mistakes 
// and preventing the use of certain error-prone features. It can be enabled for an entire script or a specific function scope.

// "use strict";

// What tools and techniques do you use debugging JavaScript code?
// 1) Browser Developer controls -> console, Debugger, Network Tab
// 2) Browser Sepcific Deve Tools -> Firefox Developers, Chrome DevTools
// 3) Node.js Debugging -> Visual Studio Code, Chrome Extensions
// 4) Third Party Tools -> Logging, Break Points

// Explain the difference between mutable and immutable objects.
// Mutable Objects can be changes but immuate objects cannot.

// Pros and Cons
// Pros
// 1) Can be more memory-efficient for certain operations, especially when dealing with large datasets.
// 2) In-place modifications can be more convenient for certain scenarios.

// Cons
// Prone to unintended side effects and bugs caused by shared references and in-place modifications.
// Can complicate reasoning about code, especially in concurrent or parallel programming.

// Synchronous Function
// In a synchronous functions tasks are exeucted one after other in a squential order. 
// Each task must complete before next one begins.  

// Example

// function Synchronous(){
//     console.log("task1");
//     console.log("task2");
//     console.log("task3");
// }

// Synchronous();

// Asynchronous Function
// In an asynchronous function, tasks can be initiated and continue executing 
// without waiting for the completion of previous tasks. The program doesn't block
// while waiting for a task to finish.

// function Asynchronous(){
//     console.log("Task1");
//     setTimeout(function(){
//         console.log("Task2 asynchronous");
//     },1000);
//     console.log("Task3");
// }

// Asynchronous();

//What is event loop?
// Event Loop is a fundamental concept in asynchronous programming that plays a crucial role 
// in managing the execution flow in a single threaded environment. It is a mechanism used by
// Javscript and other programming languages to handle a synchronous operations efficiently
// without blocking the main thread execution.

// How Event Loop Works
 
// 1) Single Threaded Execution:
// Javascript is single threaded, meaning it has only one main execution thread.
// This thread is responsible for executing the Javascript code sequentially.

// 2) Blocking Operations:
// Certain operation as I/O operations or waiting for events can be time consuming
// If the main thread were to wait for these operations to complete, it would block 
// the entire program, leading to poor performance and responsiveness.

// 3) Asynchronous Operations
// Instead of blocking the main thread for long running operations.Javscript uses asynchronous operations.

// 4) Event Queue
// When a asynchronous operations opertion completes its associated callback function is not immediately executed.
// Instead the callback is placed in the event queue.

// 5) Event Loop
// The event loop continuously checks the event queue for any pending callbacks.
// If the event queue is not empty, the event loop takes the first callback and executes it.

// 6) Non-Blocking Execution:
// Asynchronous operations allow the main thread to continue its execution without waiting for
// the completion of the asynchronous tasks. This non-blocking behavior is achieved by leveraging the event loop.

// High-Level overview of the event loop process
// 1) Execute Synchronous code
// 2) Check Event queue for pending callbacks
// 3) If the queue is not empty, deque the first callback and execute it.
// 4) Repeat the process.

// console.log("Start");

// setTimeout(function(){
//     console.log("Timeout callback");
// },1000);

// console.log("End");

// What is the difference between call stack and task queue?

// Call Stack
// The call stack is a data structure that stores information about the currently
// executing functions in a program. It operates on a Last In, First Out (LIFO) 
// principle, where the last function that is added to the stack is the first one to be executed. 

// Task Queue
// The task queue (also known as the callback queue or message queue) is a data structure that 
// holds callback functions, which are ready to be executed. It operates on a First In, First Out (FIFO) principle.

// Observer Mutation
// The Mutation Observer is a built-in JavaScript object that provides a way to watch for changes
// made to the DOM tree. It allows you to react to changes in the DOM, such as when elements are added,
// removed, or modified, without the need for continuous polling or manual event listeners.

// const observer = new MutationObserver((mutationsList) => {
//     for (const mutation of mutationsList) {
//         if (mutation.type === 'childList') {
//             console.log('A child node has been added or removed.');
//         }
//     }
// });

// // Start observing the target node for configured mutations
// const config = { childList: true, subtree: true };
// const targetNode = document.getElementById('target');
// observer.observe(targetNode, config);

// What are the differences between variables created using let, var or const?

// var 
// Variables decalred with var are function-scoped.They are no block scoped.
// If a varaible is declared inside a block, it is accessible outside the block.
// Variables declared with var are hoisted to the top of their scope. However, only the declaration is hoisted, not the initialization.
// Variables declared with var can be redeclared and reassigned within the same scope.

// let
// Variables declared with let are blocked scoped. They are only accessible within the block or statement where they are defined.
// Variables declared with let are also hoisted to the top of their block but unlike var.
// Variables declared with let can be reassigned within the same scope, but they cannot be redeclared in the same scope.

// Const
// Variables declared with const are blocked scoped. They are only accessible within the block or statement where they are defined.
// Variables declared with const are also hoisted to the top of their block but unlike var.
// Variables declared with const cannot be reassigned after initialization. 
// They must be assigned a value at the time of declaration, and this value cannot be changed later. 

// Example with var
// var x = 10;
// if (true) {
//   var x = 20; // This will overwrite the outer x
// }
// console.log(x); // Outputs 20

// // Example with let
// let y = 10;
// if (true) {
//   let y = 20; // This creates a new y variable within the block
// }
// console.log(y); // Outputs 10

// // Example with const
// const z = 10;
// z = 20; // Error: Assignment to a const variable is not allowed

// What are the differences between ES6 class and ES5 function constructors?

// ES5
// function Person(name, age) {
//     this.name = name;
//     this.age = age;
//   }
  
//   Person.prototype.sayHello = function() {
//     console.log('Hello, my name is ' + this.name);
//   };
  
//   var person1 = new Person('Bob', 30);
//   person1.sayHello();

// ES6

// class Person {
//     constructor(name, age) {
//       this.name = name;
//       this.age = age;
//     }

//     sayHello() {
//       console.log(`Hello, my name is ${this.name}`);
//     }
//   }
  
//   const person1 = new Person('Alice', 25);
//   person1.sayHello();

// Class Inheritance

// In JavaScript, events are actions or occurrences that happen in the browser, often triggered by user interactions or the browser itself. Here are some common types of events in JavaScript:

// Mouse Events:

// click: Triggered when a mouse button is pressed and released on an element.
// mouseover and mouseout: Fired when the mouse enters or leaves an element.
// mousemove: Triggered when the mouse pointer is moved over an element.
// Keyboard Events:

// keydown, keyup, and keypress: Fired when a key on the keyboard is pressed, released, or both.
// Form Events:

// submit: Fired when a form is submitted.
// change: Triggered when the value of an input element changes.
// Window Events:

// load: Fired when the HTML document has been fully loaded and parsed.
// resize: Triggered when the browser window is resized.
// scroll: Fired when the user scrolls in the document.
// Focus Events:

// focus and blur: Triggered when an element gains or loses focus.
// Event Handlers:
// Event handlers are functions that can be attached to handle specific events. Commonly used ones include onclick, onmouseover, onkeydown, etc.

// Promise
// The promise object represents the eventual completition (or failure) of an asynchronous operations and its
// resulting value.

// Example
// const whereIsMyCoffeeOrder=function(orderId){
//   return new Promise((resolve,reject)=>{
//     coffeeApi.checkStatus(orderId,(error,coffeStatus)=>{
//       if(error){
//         // promise fails
//         reject(error)
//       }else{
//         // promise is fulfilled
//         resolve(coffeStatus)
//       }
//     })
//   })
// }

// const axiosRequest=require("axios");
// let response= axiosRequest.get('----');
// console.log(`You get ${response.data.activity}`);
// we get a promise that the request will be fulfiiled in the future

// //Handle fulfilled (resolved) promises
// promise.then((result)=>{});

// //Handle failed (rejected) promises
// promise.catch((error)=>{});

//axiosRequest.get("---").then().catch()

// await
// The await operator is used to wait for a promise.It can only be used inside an async function
// with Regular Javascript code. However it can be used on its own with Javascript modules. 

// Higher Order Functions
// A function that takes another function as an argument or returns a function as its result.

// Example
// Take another function as an argument
// function greet(name){
//     return `Hello ${name}`;
// }

// function higherOrder(fn,value){
//     return fn(value);
// }

// console.log(higherOrder(greet,'Vidit'));

// return another function
// function multiplier(x){
//     return function(y){
//         return x*y;
//     }
// }

// const double = multiplier(2);
// console.log(double(3));

// Map
// const myMap = new Map();
// myMap.set('a',1);
// myMap.set('b',1);
// myMap.set('c',1);

// console.log(myMap.get('a'));
// console.log(myMap.has('b'));

// myMap.delete('c');
// console.log(myMap);
// console.log(myMap.size);

// const newMap = new Map([
//     ['Vidit',1]
// ]);

// for(let [key,value] of newMap){
//     console.log(key,value);
// }

// myMap.clear();

// Set
// const mySet = new Set();
// mySet.add(1);
// mySet.add(2);
// mySet.add(3);

// const newSet = new Set([1,2,3,4,5]);

// for(let value of newSet){
//     console.log(value);
// }

// mySet.delete(2);
// console.log(mySet.has(2));

// console.log(mySet.size);
// mySet.clear();

// __proto__ vs prototype
// __proto__
// 1) __proto__ is an internal property of an object that points to the prototype of the object from which it was created.
// 2) It is used for prototype-based inheritance and is part of the object's instance.
// 3) __proto__ can be accessed and modified directly, but it is not recommended to do so as it can lead to performance issues and unexpected behavior.

// prototype
// 1) prototype is a property of a constructor function that defines the properties and methods that will be inherited by instances created from that constructor.
// 2) It is used to define shared behavior for all instances of a particular type.
// 3) prototype is not directly accessible from instances, but it can be accessed through the constructor function.

// Person.prototype.sayHello = function () {}
// This adds a method to the Person prototype.

// Callback Hell
// Callback hell refers to a situation in asynchronous programming where multiple nested callbacks
// make the code difficult to read and maintain. It often occurs when dealing with multiple
// asynchronous operations that depend on each other, leading to deeply nested structures.

// Implicit vs Explicit Binding
// Implicit Binding
// Implicit binding occurs when a function is called as a method of an object. In this case, the this keyword inside the function refers to the object that the method is called on.

// const obj = {
//     name: 'Vidit',
//     greet: function() {
//         console.log(`Hello, ${this.name}`);
//     }
// };

// obj.greet(); // 'this' refers to 'obj'

// Explicit Binding
// Explicit binding occurs when we explicitly set the value of this using methods like call(), apply(), or bind().

// function greet() {
//     console.log(`Hello, ${this.name}`);
// }

// const person = { name: 'Vidit' };

// greet.call(person); // 'this' refers to 'person'
// greet.apply(person); // 'this' refers to 'person'

// const boundGreet = greet.bind(person);
// boundGreet(); // 'this' refers to 'person'
