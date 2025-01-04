// dataManager.js
export async function cargarDatos(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al cargar datos: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en dataManager:', error);
      throw error;
    }
  }