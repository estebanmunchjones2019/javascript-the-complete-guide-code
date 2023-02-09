export const Button = () => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = 'click me';
    document.body.append(buttonElement);
    return buttonElement;
}

export const Paragraph = () => {
    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = 'I am a paragraph';
    document.body.append(paragraphElement);
}

const booFunction = function(){alert('boooo')};

export default booFunction;

globalThis.message = 'hello world';


