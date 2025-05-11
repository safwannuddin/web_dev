//var generateName = require('sillyname');

//import generateName from"sillyname";
//var sillyName = generateName();
//console.log(`My name is ${sillyName}.`);
const superheroes = import("superheroes");
const name = superheroes.random();
console.log(`I am ${name}!`);
