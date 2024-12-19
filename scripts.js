const amount = document.getElementById("amount");

amount.oninput = (event) => {
    let value = amount.value.replace(/\D/g, "");

    amount.value = value;
}

