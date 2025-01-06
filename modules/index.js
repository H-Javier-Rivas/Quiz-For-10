// index.js

function obtenerElementosDOM() {
    return {
        loginForm: document.getElementById('login-form'),
        registerForm: document.getElementById('register-form'),
        registerError: document.getElementById('register-error'),
        loginButton: document.getElementById('login-button'),
        registerButton: document.getElementById('register-button'),
        modalContainer: document.getElementById('modal-container'),
        menuPrincipal: document.getElementById('menu-principal'),
        preguntaId: document.getElementById('pregunta'),
        logoutButton: document.getElementById('logout-button'),
        asideElement: document.querySelector('aside')
    };
}

export default obtenerElementosDOM;
