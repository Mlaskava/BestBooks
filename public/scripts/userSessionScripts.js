function sendRequest(requestType) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/" + requestType, true);
    xhr.setRequestHeader("Content-type", "application/json")
    let json = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    if (requestType === "register") {
        json.username = document.getElementById("username").value
    }
    xhr.send(JSON.stringify(json));

    xhr.onload = () => {
        console.log(xhr.responseURL);
        document.location.href = xhr.responseURL;
    }
}

function logout() {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:3000/login", true);
    xhr.send();

    xhr.onload = () => {
        console.log(xhr.responseURL);
        document.location.href = xhr.responseURL;
    }
}

function redirectToLogin() {
    document.location.href = "http://localhost:3000/login";
}