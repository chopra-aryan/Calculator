const result = document.querySelector('.result');

let current = '';
let firstNum = null;
let operator = null;

function operate(num1, num2, opr) {

    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch(opr) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 == 0 ? 'error' : num1/num2;
        default: return 'Invalid operator';
    }

}


document.querySelectorAll('.number').forEach((button) => {
    button.addEventListener('click', ()=>{
        current += button.getAttribute('data-value');
        result.textContent = current;      
    })
})




document.querySelectorAll(".operation").forEach(button => {
    button.addEventListener("click", () => {
   
        if (current == '') {  // +, do nothing if user is just pressing operation before pressing any num
            return;  
        }
        if (firstNum == null) { // if 2*, if operator is clicked after a number
            firstNum = current;
        }
        else if (operator) {
            firstNum = operate (firstNum, current, operator); // for expressions like 2+3 *
            result.textContent = firstNum;
        }

        operator = button.getAttribute('data-value');
        current = "";

    })
})




document.querySelector('.equal').addEventListener('click', () => {
   
    if (operator && current !== '0') {
        result.textContent = operate(firstNum, current, operator);
        current = '';
        operator = null;
    }
    
})


document.querySelector('.clear').addEventListener('click', () => {
    result.textContent = '';
    current = '';
    firstNum = operator = null;
})

document.querySelector('.remove').addEventListener('click', () => {
    current = current.slice(0, -1);
    result.textContent = current;
})

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (!isNaN(key) || key === '.') {
        current += key;
        result.textContent = current;
    }

    if (['/', '*', '+', '-'].includes(key)) {

        if (current == '') {  // +, do nothing if user is just pressing operation before pressing any num
            return;  
        }
        if (firstNum == null) { // if 2*, if operator is clicked after a number
            firstNum = parseFloat(current);
        }
        else if (key) {
            firstNum = operate (firstNum, current, operator); // for expressions like 2+3 *
            result.textContent = firstNum;
        }

        operator = key;
        current = "";

    }

    if (key === '=' || key === 'Enter') {

        if (operator && current) {
            result.textContent = operate(firstNum, current, operator);
            current = '';
            operator = null;
        }

    }

    if (key === 'Backspace') {
        current = current.slice(0, -1);
        result.textContent = current;
    }

    if (key === 'Escape') {
        result.textContent = '';
        current = '';
        firstNum = operator = null;
    }

})

