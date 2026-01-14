// Sorting Objects

// obj={
//     'Vidit':23,
//     'Varun':32,
//     'Udit':16,
// }

// Object.entries(obj).sort((a, b) => a[1] - b[1]).forEach(([key,value])=>{
//     delete obj[key];
//     obj[key]=value;
// });

// obj=[
//     {name:'Vidit', age:16},
//     {name:'Varun', age:13},
//     {name:'Akura', age:11},
// ]

// obj.sort((a,b)=>a.age-b.age);

// console.log(obj);

// const obj = { c: 10, a: 20, b: 10 };
// const sorted = Object.fromEntries(Object.entries(obj).sort(([keyA],[keyB]) => keyA.localeCompare(keyB)));
// console.log(sorted);

// Swapping Keys and Values in an Object

// obj = {
//     name:'Vidit',
//     age:12,
// }

// Object.entries(obj).forEach(([key,val])=>{
//     obj[val]=key
//     delete obj[key];
// });

// anagrams coding

// let s1="vidit";
// let s2="iditv";

// let n1=s1.length;
// let n2=s2.length;

// console.log(n1,n2);
// if(s1==s2){
//   console.log("Its anagram");
// }

// let a=[...s1].sort((a,b)=>a.localeCompare(b)).join("");
// let b=s2.split("").sort().join("");
// for(let i=0;i<n1;i++){
//   if(a[i]!=b[i]){
//     console.log("Its not an anagaram");
//   }
// }

// console.log("Its an anagaram");

// Reverse a String

// console.log(reverseString("Khandu ki baatein"));

// function reverseString(s){
//   let s1="";
//   for(let i=s.length-1;i>=0;i--){
//     s1+=s[i];
//   }
//   return s1;
// }

//or

// let s="Khandu ki baatein";
// console.log(s.split("").reverse().join(""));

// Find the longest word 

// console.log(findTheLongestWord("Khandu chocolate khata"));

// function findTheLongestWord(s){
//   let words=s.split(" ");
//   let ans=0;
//   let answer="";
//   for(let word of words){
//     let n1=word.length;
//     if(ans<n1){
//       ans=n1;
//       answer=word
//     }
//   }
//   return answer;
// }

// Palindrome

// let s1="nitin";
// let s2=s1.split("").reverse().join("");
// console.log(s1===s2?"It is a Palindrome":"It is not a Palindrome");

// Remove duplicates from an array

// let array=[1,2,3,4,5,4,3,2,5];
// let a=[];
// for(let i of array){
//   if(a.indexOf(i)===-1){
//     a.push(i);
//   }
// }

// console.log(a);

// count number of vowels

// console.log(countVowels("Hello Vidit"));

// function countVowels(s){
//   let words=s.split(" ");
//   let count=0;
//   for(let word of words){
//     for(let c of word){
//       if(c==="a" || c==="A"
//       || c==="E" || c==="e"
//       || c==="o" || c==="O"
//       || c==="i" || c==="I"
//       || c==="u" || c==="U"){
//         count++;
//       }
//     }
//   }
//   return count;
// }

// Find the largest number in array

// let a=[1,2,3,4,121,21,43,54];
// let maxi=0;

// for(let i of a){
//   if(maxi<i){
//     maxi=i;
//   }
// }

// console.log(maxi);

// A prime number

// console.log(isPrime(7));

// function isPrime(num){
//   for(let i=2;i<num;i++){
//     if(num%i===0){
//       console.log("Not Prime")
//     }
//   }
//   console.log("Prime")
// }

// Factorial of a Number

// console.log(factorial(5));

// function factorial(num){
//   if(num==1){
//     return 1;
//   }
//   return num*factorial(num-1);
// }

// Remove Whitespaces

// console.log(removeWhiteSpaces("Khandu     yaar    kyu"));

// function removeWhiteSpaces(s){
//   return s.replace(/\s/g,"");
// }
