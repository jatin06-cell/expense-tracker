document.addEventListener("DOMContentLoaded", function () {
    const expenseForm = document.getElementById("expenseForm");
    const expenseList = document.getElementById("expenseList");
    const totalAmount = document.getElementById("totalAmount");
    const toggleMode = document.getElementById("toggleMode");
    let expenses = [];

    function updateTotal() {
        const total = expenses.reduce((acc, item) => acc + item.amount, 0);
        totalAmount.textContent = total;
    }

    function showAlert(message, type) {
        alert(`${type.toUpperCase()}: ${message}`);
    }

    function addExpense(name, amount) {
        const id = Date.now();
        expenses.push({ id, name, amount });
        renderExpenses();
        updateTotal();
    }

    function editExpense(id) {
        const expense = expenses.find(item => item.id === id);
        if (expense) {
            const newName = prompt("Edit Expense Name:", expense.name);
            const newAmount = prompt("Edit Amount:", expense.amount);
            if (newName && newAmount) {
                expense.name = newName;
                expense.amount = parseFloat(newAmount);
                renderExpenses();
                updateTotal();
                showAlert("Expense updated!", "info");
            }
        }
    }

    function deleteExpense(id) {
        expenses = expenses.filter(item => item.id !== id);
        renderExpenses();
        updateTotal();
        showAlert("Expense deleted!", "warning");
    }

    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${expense.name} - ₹${expense.amount}
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
            `;
            li.querySelector(".edit-btn").addEventListener("click", () => editExpense(expense.id));
            li.querySelector(".delete-btn").addEventListener("click", () => deleteExpense(expense.id));
            expenseList.appendChild(li);
        });
    }

    expenseForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const expenseName = document.getElementById("expenseName").value;
        const expenseAmount = parseFloat(document.getElementById("expenseAmount").value);
        if (expenseName && expenseAmount) {
            addExpense(expenseName, expenseAmount);
            expenseForm.reset();
        } else {
            showAlert("Please fill out all fields!", "error");
        }
    });

    toggleMode.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        toggleMode.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });
});


