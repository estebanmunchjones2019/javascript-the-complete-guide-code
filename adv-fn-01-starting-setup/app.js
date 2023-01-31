// constructor function reminder

// function NumberCons(){
//     // some interesting props and methods here
// }

// NumberCons.MAX_SAFE_INTEGER = 'big number here';

// console.log(NumberCons.MAX_SAFE_INTEGER);

// // Max JS integer
Number.MAX_SAFE_INTEGER ;//9007199254740991

// let's work with a number bigger than that
const mySuperNumber = 90071992547409911000000n;

typeof mySuperNumber; // "bigint"

10n + 4; //Error: Uncaught TypeError: can't convert BigInt to number

// we nee to convert it ourselves
parseInt(10n) + 4; // 14


10n + BigInt(4); // 14n

10n/3n; // 3n no decimals in the bigint world

