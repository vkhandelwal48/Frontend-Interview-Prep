// flatten an array

// const arr = [1, [2, 3], [4, [5, 6]]];

// function flatten(arr) {
//     const flat = arr.reduce((acc,curr) => acc.concat(Array.isArray(curr) ? flatten(curr) : curr),[]);
//     return flat;
// }

// console.log(flatten(arr));

// flatten an object

// const obj = {
//   user: {
//     name: "Vidit",
//     address: {
//       city: "Bareilly",
//       pin: 243001
//     }
//   },
//   age: 25
// };

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

// json stringify pollyfill for deep clone
// const obj1 = { user: { role: 'admin' } };
// function jsonStringifyPollyfill(value) {
//     if (value === null) {
//         return 'null';
//     }  
//     if (typeof value === 'string') {
//         return `"${value.replace(/"/g, '\\"')}"`;
//     }
//     if (typeof value === 'number' || typeof value === 'boolean') {
//         return String(value);
//     }
//     if (Array.isArray(value)) {
//         const arrayElements = value.map((item) => jsonStringifyPollyfill(item)).join(',');
//         return `[${arrayElements}]`;
//     }
//     if (typeof value === 'object') {
//         const objectProperties = Object.entries(value)
//             .map(([key, val]) => `"${key.replace(/"/g, '\\"')}":${jsonStringifyPollyfill(val)}`)
//             .join(',');
//         return `{${objectProperties}}`;
//     }
//     return undefined; // For unsupported types like functions and undefined
// }  

// console.log(jsonStringifyPollyfill(obj1));
