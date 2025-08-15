const transactionsEl = document.querySelector('.transactions');
const balanceNumberEl = document.querySelector('.balance-number');
const numberIncomeEl = document.querySelector('.number--income');
const numberExpensesEl = document.querySelector('.number--expenses');
const formEl = document.querySelector('.form');
const inputDescriptionEl = document.querySelector('.input--description');
const inputAmountEl = document.querySelector('.input--amount');

// Function to update balance color
const updateBalanceColor = (balance) => {
    if (balance < 0) {
        balanceNumberEl.style.color = 'red';
    } else {
        balanceNumberEl.style.color = ''; // Reset to default color
    }
};

// Function to update balance
const updateBalance = () => {
    const income = +numberIncomeEl.textContent;
    const expenses = +numberExpensesEl.textContent;
    const updatedBalance = income - expenses;
    balanceNumberEl.textContent = updatedBalance;
    updateBalanceColor(updatedBalance);
};

const submitHandler = event => {
    // prevent default behavior
    event.preventDefault();

    // get input values
    const description = inputDescriptionEl.value.trim();
    const amount = +inputAmountEl.value;

    // validate inputs
    if (!description || !amount) {
        alert('Please fill in both description and amount fields.');
        return;
    }

    // create transaction item HTML
    const transactionItemHTML = `
    <li class="transaction transaction--${amount > 0 ? 'income' : 'expense'}">
      <span class="transaction__text">${description}</span>
      <span class="transaction__amount">${amount > 0 ? '+' : ''}${amount}</span>
      <button class="transaction__btn">X</button>
    </li>
  `;

    // insert new HTML
    transactionsEl.insertAdjacentHTML('beforeend', transactionItemHTML);

    // clear form inputs
    inputDescriptionEl.value = '';
    inputAmountEl.value = '';

    // unfocus (blur) form inputs
    inputDescriptionEl.blur();
    inputAmountEl.blur();

    // update income or expenses
    if (amount > 0) {
        const currentIncome = +numberIncomeEl.textContent;
        const updatedIncome = currentIncome + amount;
        numberIncomeEl.textContent = updatedIncome;
    } else {
        const currentExpenses = +numberExpensesEl.textContent;
        const updatedExpenses = currentExpenses + Math.abs(amount);
        numberExpensesEl.textContent = updatedExpenses;
    }

    // update balance
    updateBalance();
};

formEl.addEventListener('submit', submitHandler);

const clickHandler = (event) => {
    // Check if the clicked element is the delete button
    if (!event.target.classList.contains('transaction__btn')) {
        return;
    }

    // remove transaction item visually
    const clickedEl = event.target.parentNode;
    const amountEl = clickedEl.querySelector('.transaction__amount');
    const amount = +amountEl.textContent;

    clickedEl.remove();

    // update income or expenses
    if (amount > 0) {
        const currentIncome = +numberIncomeEl.textContent;
        const updatedIncome = currentIncome - amount;
        numberIncomeEl.textContent = updatedIncome;
    } else {
        const currentExpenses = +numberExpensesEl.textContent;
        const updatedExpenses = currentExpenses - Math.abs(amount);
        numberExpensesEl.textContent = updatedExpenses;
    }

    // update balance
    updateBalance();
};

transactionsEl.addEventListener('click', clickHandler);