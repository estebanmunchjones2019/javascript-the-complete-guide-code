const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_SELECTION = 'ROCK';

const DRAW = 'DRAW';
const PLAYER = 'PLAYER';
const COMPUTER = 'COMPUTER';

let gameIsRunning = false;

const start = function startGame() {
  console.log('Game is starting...', age);
};

const getPlayerSelection = function() {
  const selection = prompt(`Please select ${ROCK}, ${PAPER} or ${SCISSORS}`, '').toUpperCase();
  if(selection !== ROCK && selection !== PAPER && selection !== SCISSORS){
    // alert(`We've chosen ${ROCK} for you`);
    // return DEFAULT_SELECTION;
    return;
  }
  return selection;
}

const getComputerSelection = () => {
  const number = Math.random();
  if (number < 0.33){
    return ROCK;
  } else if (number < 0.66) {
    return PAPER;
  } else {
    return SCISSORS;
  }
}

const getWinner = (computerSelection, playerSelection = computerSelection === ROCK ? PAPER : DEFAULT_SELECTION) => {
  // debugger;
  if(playerSelection === computerSelection) {
    return DRAW;
  } else if(playerSelection === ROCK && computerSelection === SCISSORS || playerSelection === SCISSORS && computerSelection === PAPER || playerSelection === PAPER && computerSelection === ROCK) {
    return PLAYER;
  } else {
    return COMPUTER;
  }
}



startGameBtn.addEventListener('click', function startGame() {
  if(gameIsRunning){
    return;
  }
  gameIsRunning = true;
  console.log('Game is starting...');
  const playerSelection = getPlayerSelection();
  const computerSelection = getComputerSelection();
  const winner = getWinner(computerSelection);
  let message = `You chose ${playerSelection || DEFAULT_SELECTION}, the computer chose ${computerSelection}, so you `;
  // debugger;
  switch(winner) {
    case DRAW:
      message = message + `had a draw.😬`;
      break;
    case PLAYER: 
      message = message + `won!.😁`;
      break;
    case COMPUTER:
      message = message + `lost😕`;
      break;
     default: 
  }
  alert(message);
  gameIsRunning = false;
});

const addNumbers = (callback, ...numbers) => {
  const validateNumber = (number) => {
		return isNaN(number) ? 0 : number;
	}

  let sum = 0;
  numbers.forEach(number => {
    sum = sum + validateNumber(number);
  });
  callback(sum);
}

const myCallBack = (sum) => {
  alert(sum);
}

addNumbers(myCallBack, 1,2, 'banana', 5);

