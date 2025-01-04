// uiManager.js

/**
 * Crea un elemento <p> para un tema.
 * @param {string} temaNombre - El nombre del tema.
 * @returns {HTMLElement} El elemento <p> del tema.
 */
export function crearTemaElement(temaNombre) {
    const temaElement = document.createElement('p');
    temaElement.classList.add('tema');
    temaElement.textContent = temaNombre;
    return temaElement;
  }
  
  /**
   * Crea un elemento <ul> para la lista de objetivos.
   * @returns {HTMLElement} El elemento <ul> de la lista de objetivos.
   */
  export function crearObjetivosListElement() {
    const objetivosList = document.createElement('ul');
    objetivosList.classList.add('objetivos');
    objetivosList.style.display = 'none';
    return objetivosList;
  }
  
  
  /**
   * Crea un elemento <li> para un objetivo.
   * @param {string} objetivoNombre - El nombre del objetivo.
   * @returns {HTMLElement} El elemento <li> del objetivo.
   */
  export function crearObjetivoItemElement(objetivoNombre) {
      const objetivoItem = document.createElement('li');
      objetivoItem.textContent = objetivoNombre;
      return objetivoItem;
  }
  
  /**
   * Crea un elemento <div> para una tarjeta de respuesta.
   * @param {string} opcionTxt - El texto o ruta de la imagen de la opción.
   * @param {string} tarjetaTipo - El tipo de tarjeta ('texto' o 'imagen').
   * @returns {HTMLElement} El elemento <div> de la tarjeta de respuesta.
   */
  export function crearTarjetaRespuestaElement(opcionTxt, tarjetaTipo) {
      const tarjeta = document.createElement('div');
      tarjeta.classList.add('contenido-tarjeta');
      
      switch (tarjetaTipo) {
        case 'texto':
          const paragrafo = document.createElement('p');
          paragrafo.textContent = opcionTxt;
          tarjeta.appendChild(paragrafo);
          break;
        case 'imagen':
          const imagen = document.createElement('img');
          imagen.style.maxWidth = '100%';
          imagen.src = opcionTxt;
          tarjeta.appendChild(imagen);
          break;
        // ... otros casos
      }
      return tarjeta;
    }
  
  /**
   * Agrega una tarjeta de respuesta al contenedor de tarjetas.
   * @param {HTMLElement} tarjetaList - El elemento contenedor de las tarjetas.
   * @param {HTMLElement} tarjetaItem - La tarjeta de respuesta a agregar.
   * @param {function} clickHandler - La función manejadora de click de la tarjeta.
   */
  export function agregarTarjetaAlContenedor(tarjetaList, tarjetaItem, clickHandler) {
      tarjetaItem.addEventListener('click', clickHandler);
      tarjetaList.appendChild(tarjetaItem);
  }
  
  /**
   * Limpia el contenedor de tarjetas.
   * @param {HTMLElement} tarjetaList - El elemento contenedor de las tarjetas.
   */
  export function limpiarContenedorTarjetas(tarjetaList) {
    tarjetaList.innerHTML = '';
  }
  
  /**
   * Actualiza el texto de la pregunta en el DOM.
   * @param {HTMLElement} preguntaElement - El elemento <h3> de la pregunta.
   * @param {string} preguntaText - El texto de la pregunta.
   */
  export function actualizarTextoPregunta(preguntaElement, preguntaText) {
      preguntaElement.textContent = preguntaText;
  }
  
  /**
   * Actualiza el estilo de la tarjeta en el DOM.
   * @param {HTMLElement} tarjetaItem - El elemento <div> de la tarjeta.
   */
  export function actualizarEstiloTarjeta(tarjetaItem) {
    tarjetaItem.style.backgroundColor = 'darkgreen';
    tarjetaItem.style.boxShadow = '0px 5px 10px rgba(0,0,0,0.2)';
  }
  
  /**
   * Alterna la visualización de la lista de objetivos.
   * @param {HTMLElement} objetivosList - El elemento <ul> de la lista de objetivos.
   */
  export function toggleObjetivosListDisplay(objetivosList){
    objetivosList.style.display = (objetivosList.style.display === 'block') ? 'none' : 'block';
  }
  
  /**
   * Agrega un elemento al DOM.
   * @param {HTMLElement} parentElement - El elemento padre.
   * @param {HTMLElement} childElement - El elemento hijo.
   */
  export function agregarElementoAlDOM(parentElement, childElement){
    parentElement.appendChild(childElement);
  }