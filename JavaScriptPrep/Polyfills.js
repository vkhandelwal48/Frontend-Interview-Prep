// flatten an array

// function flatten(arr) {
//     const flat = arr.reduce((acc,curr) => acc.concat(Array.isArray(curr) ? flatten(curr) : curr),[]);
//     return flat;
// }

// console.log(flatten(arr));

// flatten an object

// function ObjectFlatten(obj, parent = '') {
//   return Object.keys(obj).reduce((acc, curr) => {
//     const key = parent ? `${parent}.${curr}` : curr;

//     if (
//       typeof obj[curr] === 'object' &&
//       obj[curr] !== null &&
//       !Array.isArray(obj[curr])
//     ) {
//       Object.assign(acc, ObjectFlatten(obj[curr], key));
//     } else {
//       acc[key] = obj[curr];
//     }

//     return acc;
//   }, {});
// }

// console.log(ObjectFlatten(obj,''))


// deep clone

// const obj1 = { user: { role: 'admin' } };

// function deepClone(value) {
//     if (typeof value!== 'object' || value === null) {
//         return value;
//     }
    
//     if (Array.isArray(value)) {
//         return value.map((item) => deepClone(value));
//     }
    
//     return Object.fromEntries(
//         Object.entries(value).map(([key, value]) => [key, deepClone(value)])
//     );
// }

// console.log(jsonStringifyPollyfill(obj1));

// Function.prototype.call

// Function.prototype.myCall = function (thisArg, ...argArray) {
//   return this.apply(thisArg,argArray);
// };

// Function.prototype.reduce

// Array.prototype.myReduce = function (callbackFn, initialValue) {
//     const noInitialValue = initialValue === undefined;
//     const len = this.length;

//     if (noInitialValue && len === 0) {
//         throw new TypeError('Reduce of empty array with no initial value');
//     }

//     let acc = noInitialValue ? this[0] : initialValue;
//     let startingIndex = noInitialValue ? 1 : 0;

//     for (let k=startingIndex; k<len; k++) {
//         if (Object.hasOwn(this,k)) {
//             acc = callbackFn(acc,this[k],k,this);
//         }
//     }
//     return acc;
// };

// Function.prototype.apply

// Array.prototype.map = function (callback, thisArg) {
//   var arr = [];
//   for (var i = 0; i < this.length; i++) {
//     if (i in this) arr[i] = callback.call(thisArg, this[i], i, this);
//   }
//   return arr;
// };

// Array.prototype.filter

// Array.prototype.filter = function (callback, thisArg) {
//   var arr = [];
//   for (var i = 0; i < this.length; i++) {
//     if (i in this && callback.call(thisArg, this[i], i, this)) arr.push(this[i]);
//   }
//   return arr;
// };

// Promisify

// function promisify(func) {
//   return function (...args) {
//     return new Promise((resolve, reject) => {
//       func.call(this, ...args, (err, result) =>
//         err ? reject(err) : resolve(result),
//     );
//   });
//   }
// }

// Function.prototype.bind

// Function.prototype.myBind = function (context, ...bindArgs) {
//   if (typeof this !== 'function') {
//     throw new TypeError('Bind must be called on a function');
//   }

//   const fn = this;

//   return function (...callArgs) {
//     return fn.apply(context,[...bindArgs, ...callArgs]);
//   };
// };
