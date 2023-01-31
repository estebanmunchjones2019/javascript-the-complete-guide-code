const clickHandler = (event) => {
    debugger;
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.target.style.backgroundColor = 'yellow';
}
// const clickHandler2 = (event) => {
// debugger;
// event.stopPropagation();
//     event.target.style.backgroundColor = 'yellow';
// }

// const clickHandlerBody = () => {
//     debugger;
// }

const buttonElement = document.querySelector('button');

buttonElement.addEventListener('click', clickHandler);
// buttonElement.addEventListener('click', clickHandler2);

// document.body.addEventListener('click', clickHandlerBody);

const formElement = document.querySelector('form');

formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event)
})

document.querySelector('ul').addEventListener('click', function (event) {
    event.target.closest('li').classList.toggle('highlight');
    console.log(this);
});


// document.querySelectorAll('li').forEach(li => {
//     li.addEventListener('click', function (event){
//         event.target.classList.toggle('highlight');

//     }
//     );
// });





