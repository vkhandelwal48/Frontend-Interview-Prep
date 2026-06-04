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
//         return value.map((item) => deepClone(item));
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

// Debounce

// function debounce(fn, delay) {
//     let timeoutId = null;

//     return function (...args) {
//         clearTimeout(timeoutId);

//         timeoutId = setTimeout(() => {
//             timeoutId = null;
//             fn.apply(this, args);
//         }, delay);
//     }
// }

// Throttle

// function throttle(fn, delay) {
//     let shouldThrottle = false;

//     return function (...args) {
//         if (!shouldThrottle) {
//             shouldThrottle = true;
//             setTimeout(() => shouldThrottle = false, delay);
//             fn.apply(this, args);
//         }
//     }
// }

// Promise.all

// function promiseAll(iterable) {
//     return new Promise((resolve, reject) => {
//         const arr = Array.from(iterable);
//         const results = new Array(arr.length);
//         let unresolved = arr.length;

//         if (unresolved === 0) {
//             resolve(results);
//             return;
//         }

//         arr.forEach((item, index) => {
//             Promise.resolve(item).then(
//                 (value) => {
//                     results[index] = value;
//                     unresolved-=1;

//                     if (unresolved === 0) {
//                         resolve(results);
//                     }
//                 },
//                 (error) => {
//                     reject(error);
//                 }
//             )
//         })
//     })
// }

// Promise.any

// function promiseAny(iterable) {
//     return new Promise((resolve, reject) => {
//         const arr = Array.from(iterable);
//         const errors = new Array(arr.length);
//         let rejectedCount = 0;

//         if (arr.length === 0) {
//             reject(new AggregateError([], 'All promises were rejected'));
//             return;
//         }

//         arr.forEach((item, index) => {
//             Promise.resolve(item).then(
//                 (value) => {
//                     resolve(value);
//                 },
//                 (error) => {
//                     errors[index] = error;
//                     rejectedCount += 1;

//                     if (rejectedCount === arr.length) {
//                         reject(new AggregateError(errors, 'All promises were rejected'));
//                     }
//                 }
//             )
//         })
//     })
// }

// Promise.race

// function promiseRace(iterable) {
//     return new Promise((resolve, reject) => {
//         const arr = Array.from(iterable);

//         // Empty iterable → promise stays pending forever (matches native behaviour)
//         arr.forEach((item) => {
//             Promise.resolve(item).then(resolve, reject);
//         });
//     });
// }

// Promise.allSettled

// function allSettled(iterable) {
//     return new Promise((resolve) => {
//         const arr = Array.from(iterable);
//         const results = new Array(arr.length);
//         let settledCount = 0;

//         if (arr.length === 0) {
//             resolve(results);
//             return;
//         }

//         arr.forEach((item, index) => {
//             Promise.resolve(item).then(
//                 (value) => {
//                     results[index] = { status: 'fulfilled', value };
//                     settledCount += 1;

//                     if (settledCount === arr.length) {
//                         resolve(results);
//                     }
//                 },
//                 (reason) => {
//                     results[index] = { status: 'rejected', reason };
//                     settledCount += 1;

//                     if (settledCount === arr.length) {
//                         resolve(results);
//                     }
//                 }
//             );
//         });
//     });
// }

// forEach

// function myForEach(arr, callback, thisArg) {
//     for (let i = 0; i < arr.length; i++) {
//         if (i in arr) {
//             callback.call(thisArg, arr[i], i, arr);
//         }
//     }
// }

// findIndex

// function myFindIndex(arr, callback, thisArg) {
//     for (let i = 0; i < arr.length; i++) {
//         if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
//             return i;
//         }
//     }
//     return -1;
// }

// every

// function myEvery(arr, callback, thisArg) {
//     for (let i = 0; i < arr.length; i++) {
//         if (i in arr && !callback.call(thisArg, arr[i], i, arr)) {
//             return false;
//         }
//     }
//     return true;
// }

// some

// function mySome(arr, callback, thisArg) {
//     for (let i = 0; i < arr.length; i++) {
//         if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
//             return true;
//         }
//     }
//     return false;
// }

// myApply

// function myApply(func, thisArg, argArray) {
//     return func.apply(thisArg, argArray);
// }

// curry

// function curry(func) {
//     return function curried(...args) {
//         if (args.length >= func.length) {
//             return func.apply(this, args);
//         }
//         return function (...args2) {
//             return curried.apply(this, [...args, ...args2]);
//         };
//     };
// }

// memoize

// function memoize(func) {
//     const cache = new Map();
//     return function (...args) {
//         const key = JSON.stringify(args);
//         if (cache.has(key)) {
//             return cache.get(key);
//         }
//         const result = func.apply(this, args);
//         cache.set(key, result);
//         return result;
//     };
// }

// Compose

// function compose(...functions) {
//   return function (value) {
//     return functions.reduceRight((acc, fn) => {
//       return fn(acc);
//     }, value);
//   };
// }

// Pipe

// function pipe(...functions) {
//   return function (value) {
//     return functions.reduce((acc, fn) => {
//       return fn(acc);
//     }, value);
//   };
// }
