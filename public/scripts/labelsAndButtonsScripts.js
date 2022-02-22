function decreaseValue(element, isUpdateNeeded) {
    const input = document.getElementById(element.getAttribute('for'));
    if (input.value > 1) {
        input.value -= 1;
    }
    if (isUpdateNeeded) {
        changeAmount(input);
    }
}

function increaseValue(element, isUpdateNeeded) {
    const input = document.getElementById(element.getAttribute('for'));
    input.value++;
    if (isUpdateNeeded) {
        changeAmount(input);
    }
}

function addToCart() {
    const input = document.getElementById("product");
    const cartRequest = new XMLHttpRequest();
    cartRequest.open("POST", "http://localhost:3000/cart?method=append", true);
    cartRequest.setRequestHeader("Content-Type", "application/json");
    cartRequest.send(JSON.stringify({product_id: input.className, amount: input.value}));

    cartRequest.onload = () => {
        const response = JSON.parse(cartRequest.response);
        alert(response.message)
    }
}

function changeAmount(input) {
    const prizes = document.getElementsByClassName("prize");
    let prize
    for (let i = 0; i < prizes.length; i++) {
        if (prizes[i].getAttribute('for') === input.id) {
            prize = prizes[i];
            break;
        }
    }
    const amountRequest = new XMLHttpRequest();
    amountRequest.open("POST", "http://localhost:3000/cart?method=set", true);
    amountRequest.setRequestHeader("Content-Type", "application/json");
    amountRequest.send(JSON.stringify({product_id: input.id, amount: input.value}));

    amountRequest.onload = () => {
        const response = JSON.parse(amountRequest.response);
        if (response.message !== "") {
            alert(response.message);
        }
        input.value = response.value;
        prize.innerHTML = Math.round((Number(response.prize) + Number.EPSILON) * 100) / 100 + " ZŁ"
    }
}

function deleteRecords(element) {
    const deleteRequest = new XMLHttpRequest();
    if (element !== undefined) {
        console.log(element)
        deleteRequest.open("DELETE", "http://localhost:3000/cart?entries=" + element.getAttribute('for'), true);
    } else {
        deleteRequest.open("DELETE", "http://localhost:3000/cart?entries=ALL", true);
    }
    deleteRequest.onload = () => {
        document.location.href = deleteRequest.responseURL;
    }
    deleteRequest.send();
}

function redirect(href) {
    window.location.href = href;
}