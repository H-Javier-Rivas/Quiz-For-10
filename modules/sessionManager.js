import { cargarDatos } from './dataManager.js';
import { gestionarPreguntas } from './questionManager.js';
import * as uiManager from './uiManager.js';
import * as authManager from './authManager.js';
import obtenerElementosDOM from './index.js';

const el = obtenerElementosDOM();
let isLoginListenerAdded = false;
let isRegisterListenerAdded = false;

// Función para manejar la visualización de la interfaz según el estado de sesión
export function handleSessionState() {
  if (authManager.isLoggedIn()) {

    // Se modifica el menú principal para que muestre el botón de cerrar sesión
    el.menuPrincipal.innerHTML = '<a href="#" id="logout-button">Cerrar Sesión</a>';
    
    // Se actualiza la referencia al elemento 'logout-button'
    el.logoutButton = document.getElementById('logout-button');
    
    // Agregar el evento de click al botón de cerrar sesión
    el.logoutButton.addEventListener('click', () => {
      authManager.logoutUser();
      location.reload();
    });

    // Cargar datos de la asignatura si el usuario ha iniciado sesión
    cargarDatos('data/asignatura.json')
      .then(data => {

        // PARA CADA TEMA: Se crea el elemento con el nombre del tema y la lista de objetivos asociados
        data.forEach(tema => {
          const temaElement = uiManager.crearTemaElement(tema.tema);
          const objetivosList = uiManager.crearObjetivosListElement();

          temaElement.addEventListener('click', () => {
            uiManager.toggleObjetivosListDisplay(objetivosList);
          });

          // PARA CADA OBJETIVO DE UN TEMA:
          tema.objetivos.forEach(objetivo => {
            const objetivoItem = uiManager.crearObjetivoItemElement(objetivo.nombre);
            gestionarPreguntas(objetivoItem, objetivosList, objetivo, el.preguntaId);
          });

          uiManager.agregarElementoAlDOM(el.asideElement, temaElement);
          uiManager.agregarElementoAlDOM(el.asideElement, objetivosList);
        });
      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
      });

  } else {

    el.loginButton.addEventListener('click', () => {
      el.modalContainer.style.display = 'flex';
      el.loginForm.style.display = 'block';

      // Evento de inicio de sesión
      if (!isLoginListenerAdded) {
        el.loginForm.addEventListener('submit', handleLoginSubmit);
        isLoginListenerAdded = true;

      } else {
        el.modalContainer.style.display = 'none';
        el.loginForm.style.display = 'none';
        isLoginListenerAdded = false;
        handleSessionState(); // Actualizamos la interfaz después de iniciar sesión
      }
    });

    el.registerButton.addEventListener('click', () => {
      el.modalContainer.style.display = 'flex';
      el.registerForm.style.display = 'block';

      // Evento de registro
      if (!isRegisterListenerAdded) {
        el.registerForm.addEventListener('submit', handleRegisterSubmit);
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
    el.modalContainer.style.display = 'none';
    el.loginForm.style.display = 'none';
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
    el.modalContainer.style.display = 'none';
    el.registerForm.style.display = 'none';
    isRegisterListenerAdded = false;
    handleSessionState();
  } catch (error) {
    registerError.textContent = error.message;
  }
}