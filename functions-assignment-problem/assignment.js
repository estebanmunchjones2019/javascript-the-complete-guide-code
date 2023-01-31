function sayHello(name) {
  console.log('Hi ' + name);
}

const sayHello1 = (name) =>{
  console.log('Hi ' + name);
}

const sayHello3 = () =>{
  console.log('Hi bob');
}

const sayHello4 = (name) =>{
  return 'Hi ' + name;
}

const sayHello5 = (name = 'tebi') =>{
  console.log('Hi ' + name);
}

const checkInput = (callback, ...strings) => {
  // call the fn if all non empty
  let hasEmptyString = false;
  for (string of strings) {
    if (!string) {
      hasEmptyString = true;
    }
    break;
  }

  if(!hasEmptyString) {
    callback();
  }
}

sayHello5();

checkInput(() => console.log('All non empty'), '', '');

const sayHello2 = (greeting, name) =>{
  console.log(greeting + name);
}

sayHello2.apply(this, 'Special greetings ')('tebi!'); // Special greetings, tebi!


const document = null;

document.getElementById('id');

