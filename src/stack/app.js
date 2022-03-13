class Stack {
    constructor() {
        this.items = [];
        this.top = 0;
    }
}

Stack.prototype.push = function (element) {
    this.items[this.top] = element;
    this.top++;
}

Stack.prototype.pop = function () {
    if (this.top === 0) {
        return "Underflow: no more elements to delete";
    }
    const lastElement = this.items[this.top - 1];
    this.items.length -= 1;
    this.top--;
    return lastElement;
}

Stack.prototype.show = function () {
    return this.items;
}

window.addEventListener('DOMContentLoaded', () => {
    let stack = new Stack();

    const pushbtn = document.querySelector('button.push');
    const popbtn = document.querySelector('button.pop');
    const textField = document.querySelector('input');
    const resultCon = document.querySelector('div.result');
    const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    pushbtn.addEventListener('click', (event) => {
        if (event) {
            resultCon.innerHTML = `${textField.value} is push to the stack`;
            stack.push(textField.value);
            textField.value = null;
            display('push');
        }
    });
    popbtn.addEventListener('click', (event) => {
        if (event) {
            resultCon.innerHTML = `${stack.pop()} is removed from the stack`;
            display('pop');
        }
    });

    function display(type) {
        let element = document.querySelector('div.stacks');

        if (type === 'push') {
            let fragment = document.createDocumentFragment();
            const lists = stack.show();
            let lastElem = lists[lists.length - 1];
            const box = document.createElement('box');
            const rand = Math.floor(Math.random() * colorArray.length);
            box.style.backgroundColor = colorArray[rand];
            box.classList.add('box');
            box.textContent = lastElem;
            fragment.appendChild(box);
            element.appendChild(fragment);
        } else {
            const lastElem = element.lastElementChild;
            element.removeChild(lastElem);
        }




    }
})