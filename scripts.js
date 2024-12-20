const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2");

function loadSampleData() {
    const sampleExpenses = new Array(
        {
            id: new Date().getTime(),
            expense: "Almoço",
            category_id: "food",
            category_name: "Alimentação",
            amount: "471,47",
            created_at: new Date(),
        },
        {
            id: new Date().getTime(),
            expense: "Diárias",
            category_id: "accommodation",
            category_name: "Hospedagem",
            amount: "799,80",
            created_at: new Date(),
        },
        {
            id: new Date().getTime(),
            expense: "Cópia de chave",
            category_id: "services",
            category_name: "Serviços",
            amount: "55,00",
            created_at: new Date(),
        },
        {
            id: new Date().getTime(),
            expense: "Táxi",
            category_id: "transport",
            category_name: "Transporte",
            amount: "389,90",
            created_at: new Date(),
        },
        {
            id: new Date().getTime(),
            expense: "Material de escritório",
            category_id: "others",
            category_name: "Outros",
            amount: "235,40",
            created_at: new Date(),
        },
    );


    for (let expense of sampleExpenses) {
        expenseAdd(expense);
    }
}

loadSampleData();
// updateTotals();

amount.oninput = (event) => {
    let value = amount.value.replace(/\D/g, "");

    value = Number(value) / 100;

    amount.value = formatCurrencyBRL(value);
}

function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    return value;
}

form.onsubmit = (event) => {
    event.preventDefault();

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    expenseAdd(newExpense);
}

function expenseAdd(newExpense) {
    try {
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");

        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");

        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense;

        const expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExpense.category_name;

        const expenseAmount = document.createElement("span");
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`;

        const removeIcon = document.createElement("img");
        removeIcon.classList.add("remove-icon");
        removeIcon.setAttribute("src", "img/remove.svg");
        removeIcon.setAttribute("alt", "remover");

        expenseInfo.append(expenseName, expenseCategory);
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
        expenseList.append(expenseItem);

        formClear();

        updateTotals();

    } catch (error) {
        console.log(error);
        alert("Não foi possível adicionar a despesa");
    }
}

function updateTotals() {
    try {
        const items = expenseList.children;
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;

        let total = 0;

        for (let item of items) {
            const itemAmount = item.querySelector(".expense-amount");

            let value = itemAmount.textContent.replace(/[^\d]/g, "").replace(",", ".");

            value = parseFloat(value);

            if (isNaN(value)) {
                return alert("Não foi possível clalcular o total. O valor parece não ser um número");
            }

            total += Number(value / 100);
        }

        expensesTotal.innerHTML = `<small>R$</small>${formatCurrencyBRL(total).toUpperCase().replace("R$", "")}`;
    } catch (error) {
        console.log(error);
        alert("Não foi possível atualizar os totais.")
    }
}

function formClear() {
    expense.value = "";
    category.value = "";
    amount.value = "";

    expense.focus();
}

expenseList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-icon")) {
        const item = event.target.closest(".expense");

        item.remove();

        updateTotals();
    }
})