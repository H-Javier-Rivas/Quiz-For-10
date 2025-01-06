// questionManager.js
import * as uiManager from './uiManager.js';

export function gestionarPreguntas(objetivoItem, objetivosList, objetivo, pregunta) {

  // EVENTO DE CLICK PARA SELECCIONAR UNA PREGUNTA ALEATORIA
  objetivoItem.addEventListener('click', () => {
    if (objetivo.preguntas.length === 0) {
      alert('No hay más preguntas para mostrar en este objetivo');
      return 0;
    }

    const indiceAleatorio = Math.floor(Math.random() * objetivo.preguntas.length);
    const preguntaAleatoria = objetivo.preguntas[indiceAleatorio];

    // Actualizar la interfaz a través del uiManager
    uiManager.actualizarTextoPregunta(pregunta, preguntaAleatoria.pregunta);
    uiManager.limpiarContenedorTarjetas(document.getElementById('tarjetas'));

    // Para cada opción de la pregunta, crear la tarjeta y agregarla al contenedor
    preguntaAleatoria.opciones.forEach((opcion, indice) => {
        const tarjetaItem = uiManager.crearTarjetaRespuestaElement(opcion, preguntaAleatoria.tarjetaTipo);
        
        const clickHandler = () => {
            if (preguntaAleatoria.respuestaCorrecta == indice) {
                uiManager.actualizarEstiloTarjeta(tarjetaItem);
            }
        };

        uiManager.agregarTarjetaAlContenedor(document.getElementById('tarjetas'), tarjetaItem, clickHandler);
    });

    // Eliminar la pregunta utilizada
    objetivo.preguntas.splice(indiceAleatorio, 1);
  });

  uiManager.agregarElementoAlDOM(objetivosList, objetivoItem);
}
