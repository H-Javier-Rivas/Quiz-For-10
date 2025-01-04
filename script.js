// script.js
import { cargarDatos } from './dataManager.js';
import { gestionarPreguntas } from './questionManager.js';
import * as uiManager from './uiManager.js';
import * as authManager from './authManager.js';

// Obtener elementos del DOM
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const registerError = document.getElementById('register-error');
const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const modalContainer = document.getElementById('modal-container');
const menuPrincipal = document.getElementById('menu-principal');
let isLoginListenerAdded = false;
let isRegisterListenerAdded = false;

// Función para manejar la visualización de la interfaz según el estado de sesión
function handleSessionState() {
  if (authManager.isLoggedIn()) {
    // Agregamos botón de cerrar sesión
    menuPrincipal.innerHTML = '<a href="#" id="logout-button">Cerrar Sesión</a>';

    // Agregar el evento de click al botón de cerrar sesión
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', () => {
      authManager.logoutUser();
      location.reload();
    });

    // Cargar datos de la asignatura si el usuario ha iniciado sesión
    cargarDatos('data/asignatura.json')
      .then(data => {
        const asideElement = document.querySelector('aside');

        // PARA CADA TEMA:
        data.forEach(tema => {
          const temaElement = uiManager.crearTemaElement(tema.tema);
          const objetivosList = uiManager.crearObjetivosListElement();

          temaElement.addEventListener('click', () => {
            uiManager.toggleObjetivosListDisplay(objetivosList);
          });

          // PARA CADA OBJETIVO DE UN TEMA:
          tema.objetivos.forEach(objetivo => {
            const objetivoItem = uiManager.crearObjetivoItemElement(objetivo.nombre);
            gestionarPreguntas(objetivoItem, objetivosList, objetivo);
          });

          uiManager.agregarElementoAlDOM(asideElement, temaElement);
          uiManager.agregarElementoAlDOM(asideElement, objetivosList);
        });
      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
      });

  } else {

    loginButton.addEventListener('click', () => {
      modalContainer.style.display = 'flex';
      loginForm.style.display = 'block';

      // Evento de inicio de sesión
      if (!isLoginListenerAdded) {
        loginForm.addEventListener('submit', handleLoginSubmit);
        isLoginListenerAdded = true;

      } else {
        modalContainer.style.display = 'none';
        loginForm.style.display = 'none';
        isLoginListenerAdded = false;
        handleSessionState(); // Actualizamos la interfaz después de iniciar sesión
      }
    });

    registerButton.addEventListener('click', () => {
      modalContainer.style.display = 'flex';
      registerForm.style.display = 'block';

      // Evento de registro
      if (!isRegisterListenerAdded) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
        isRegisterListenerAdded = true;
      }
    });
  }
}

// Evento de inicio de sesión
function handleLoginSubmit(event) {
  event.preventDefault(); // Evitar que el formulario se envíe de forma convencional

  const loginUsername = document.getElementById('login-username').value;
  const loginPassword = document.getElementById('login-password').value;

  try {
    authManager.loginUser(loginUsername, loginPassword);
    modalContainer.style.display = 'none';
    loginForm.style.display = 'none';
    isLoginListenerAdded = false;
    handleSessionState(); // Actualizamos la interfaz después de iniciar sesión
  } catch (error) {
    alert(error.message); // Muestra el error de inicio de sesión
  }
}

// Evento de registro
function handleRegisterSubmit(event) {
  event.preventDefault(); // Evitar que el formulario se envíe de forma convencional

  const registerUsername = document.getElementById('register-username').value;
  const registerPassword = document.getElementById('register-password').value;

  try {
    authManager.registerUser(registerUsername, registerPassword);
    alert('Usuario registrado exitosamente. Por favor inicie sesión.');

    // Cambia a la interfaz de inicio de sesión después del registro
    modalContainer.style.display = 'none';
    registerForm.style.display = 'none';
    isRegisterListenerAdded = false;
    handleSessionState();
  } catch (error) {
    registerError.textContent = error.message;
  }
}

handleSessionState();