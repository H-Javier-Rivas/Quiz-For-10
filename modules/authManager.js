// authManager.js

export function registerUser(username, password) {
  console.log(username, password); // Cuando la aplicación funcione, quitar esta línea.
  try {
    let users = JSON.parse(localStorage.getItem('users') || '{}');

    if (users[username]) {
      throw new Error('El nombre de usuario ya existe.');
    }

    users[username] = { password, scores: [] };
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', username);

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error; // Re-lanzar el error para que pueda ser manejado por el componente llamante
  }
}

// Inicio de sesión
export function loginUser(username, password) {

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const user = users[username];
  if (!user || user.password !== password) {
    alert(`¡El usuario "${username}" no está registrado o su password es incorrecto!`);
    return;
  }
  localStorage.setItem('currentUser', username);
}

// Cierre de sesión
export function logoutUser() {
  localStorage.removeItem('currentUser');
}

// Verificar si el usuario está logueado
export function isLoggedIn() {
  return !!localStorage.getItem('currentUser');
}

// Obtener el usuario actual
export function getCurrentUser() {
  return localStorage.getItem('currentUser');
}