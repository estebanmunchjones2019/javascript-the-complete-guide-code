
// function Human(){
//     this.breathes = true;
//     this.printAge = function() {
//         console.log(this.age);
//     }
// }

// function Person (){
//     this.name = 'Max'; // this is not technically the same as the name = "Max in the class above, tbd"
//     this.age = 30;
//     this.printGreeting = function(){
//         console.log(`Hi I'm ${this.name}`);
//     }

// }

// // extends keyword does this for me under the hood!
// Person.prototype = new Human();
// //OR
// Person.prototype = {
//     breathes: true,
//     printAge: function(){
//         console.log(this.age);
//     }
// }
// // OR
// Person.prototype.breathes = true;
// Person.prototype.printAge = function(){
//     console.log(this.age);
// }


// const person = new Person();
// console.log(person);

// const person2 = new person.__proto__.constructor();

// console.log(person2); // same as person


// console.log(person); // Object { name: "Max", age: 30, printGreeting: printGreeting() }
// console.log(person.breathes);
// person.printAge(); //prints 30 // the `this` inside printAge refers to what called printAge, which is person in this case, it works!
// console.log(person.__proto__);

// console.log(Person.prototype === person.__proto__); // true! is the very same object in memory, not copies 😮

// console.log(Person.length);

// class Dog {
//     static bark(){
//         console.log('woof');
//     }
// }

// const dog = new Dog();
// dog.bark(); // Error: bark is not a function
// Dog.bark(); // work fine




// class Person {
//   name = 'Max';
//     sayBye(){
//     console.log('bye!');
//   }
// }

// function Person(){
// 	this.name = 'Max';
// }

// Person.prototype = function sayBye(){
// 	console.log('bye!');
// }


// const person1 = new Person();
// const person2 = new Person();

// console.log(person1.__proto__.sayBye === person2.__proto__.sayBye); // true!

// const players = ['messi', 'martinez'];

// players.__proto__.forEach = function(){
//     console.log('forEach has been hacked!');

// }
// players.forEach(); // 'forEach has been hacked!'

// Object.setPrototypeOf(players, {
//     ...Object.getPrototypeOf(players),
//     forEach(){
//         console.log('forEach has been hacked!');
//     }
// });

// players.forEach(); // 'forEach has been hacked!'


// // player.__proto__ is Object

// Object.setPrototypeOf(players, {
//     // ...Object.getPrototypeOf(players)// no need to spread Object, because it will be the protype of the object I'm writing this from
//     forEach(){
//         console.log('forEach has been hacked!');
//     }
// });



const player = Object.create({ 
    shoutGoal(){
        console.log('goooooool');
    }
});

console.log(player);

// {}
//     [[Prototype]]: Object
//     shoutGoal: ƒ shoutGoal()
//     [[Prototype]]: Object
//         constructor: ƒ Object()
//         hasOwnProperty: ƒ hasOwnProperty()

player.isRightHanded = false;










