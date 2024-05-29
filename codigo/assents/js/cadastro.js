document.addEventListener("DOMContentLoaded", function() {
    var btnSignin = document.querySelector("#signin");
    var btnSignup = document.querySelector("#signup");
    var formSignup = document.querySelector("#signup-form");
    var formSignin = document.querySelector("#signin-form");
    var body = document.querySelector("body");

    console.log(btnSignin);
    console.log(btnSignup);
    console.log(formSignup);
    console.log(formSignin);
    console.log(body);

    // Função para armazenar os dados no localStorage
    function storeUserData(name, email, password) {
        var userData = {
            name: name,
            email: email,
            password: password
        };
        localStorage.setItem("userData", JSON.stringify(userData));
    }

    // Função para processar o envio do formulário de cadastro
    function handleSignup(event) {
        event.preventDefault();
        console.log("Signup button clicked");
        var name = document.querySelector('#name').value;
        var email = document.querySelector('#email').value;
        var password = document.querySelector('#password').value;
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);
        storeUserData(name, email, password);
        // Aqui você pode adicionar mais ações, como redirecionar o usuário para uma página de login, exibir uma mensagem de sucesso, etc.
    }

    // Função para processar o envio do formulário de login
    function handleSignin(event) {
        event.preventDefault();
        console.log("Signin button clicked");
        var email = document.querySelector('#signin-email').value;
        var password = document.querySelector('#signin-password').value;
        console.log("Email:", email);
        console.log("Password:", password);
        // Aqui você pode adicionar a lógica para autenticar o usuário
    }

    btnSignin.addEventListener("click", function () {
        body.className = "sign-in-js"; 
    });

    btnSignup.addEventListener("click", function () {
        body.className = "sign-up-js";
    });

    // Adicionando eventos de envio aos formulários
    formSignup.addEventListener("submit", handleSignup);
    formSignin.addEventListener("submit", handleSignin);
});