document.addEventListener("DOMContentLoaded", function() {
    var btnSignin = document.querySelector("#signin");
    var btnSignup = document.querySelector("#signup");
    var formSignup = document.querySelector("#signup-form");
    var formSignin = document.querySelector("#signin-form");
    var body = document.querySelector("body");

    // Armazenar os dados do usuário no Local Storage
    function storeUserData(name, email, password) {
        var users = JSON.parse(localStorage.getItem("users")) || [];
        var userId = users.length + 1;
        var userData = {
            id: userId,
            name: name,
            email: email,
            password: password
        };
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Processar o envio do formulário de cadastro
    function handleSignup(event) {
        event.preventDefault();
        var name = document.querySelector('#name').value;
        var email = document.querySelector('#email').value;
        var password = document.querySelector('#password').value;
        if (name && email && password) {
            storeUserData(name, email, password);
            alert("Cadastro realizado com sucesso!");
        } else {
            alert("Preencha os campos corretamente.");
        }
    }

    // Processar o envio do formulário de login
    function handleSignin(event) {
        event.preventDefault();
        var email = document.querySelector('#signin-email').value;
        var password = document.querySelector('#signin-password').value;
        var users = JSON.parse(localStorage.getItem("users")) || [];
        var user = users.find(user => user.email === email && user.password === password);
        if (user) {
            alert("Login efetuado com sucesso!");
        } else {
            alert("Email ou senha inválidos.");
        }
    }

    // Adicionar eventos de clique para transição de telas
    btnSignin.addEventListener("click", function () {
        fadeTransition("sign-in-js");
    });

    btnSignup.addEventListener("click", function () {
        fadeTransition("sign-up-js");
    });

    // Adicionar eventos de envio aos formulários
    formSignup.addEventListener("submit", handleSignup);
    formSignin.addEventListener("submit", handleSignin);

    // Função para aplicar a transição suave entre telas
    function fadeTransition(className) {
        var elements = document.querySelectorAll('.first-column, .image-wrapper, .title-primary, .description-primary');
        elements.forEach(function(element) {
            element.classList.add('fade-out');
        });

        setTimeout(function() {
            body.className = className;
            elements.forEach(function(element) {
                element.classList.remove('fade-out');
                element.classList.add('fade-in');
            });
        }, 500); // Tempo da animação de fade-out
    }

    // Aplica a animação inicial de carregamento
    window.onload = function() {
        var elements = document.querySelectorAll('.first-column, .image-wrapper, .title-primary, .description-primary');
        elements.forEach(function(element) {
            element.classList.add('initial-load');
        });
    };
});
