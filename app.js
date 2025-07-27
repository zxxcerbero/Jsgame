let numSecreto;
let intentos = 0;
let maxNumero = 10; // Dificultad inicial por defecto
let nivelDesbloqueado = 10; // Se inicia con el nivel 10 desbloqueado

// Asignar texto a un elemento HTML
function asignarTextoElemento(elemento, texto) {
  const elem = document.querySelector(elemento);
  if (elem) {
    elem.innerHTML = texto;
  }
}

// Limpiar el input
function limpiarCaja() {
  document.getElementById("verificarInput").value = "";
}

// Generar un número secreto según la dificultad
function generarNumeroSecreto() {
  numSecreto = Math.floor(Math.random() * maxNumero) + 1;
  intentos = 0;
  limpiarCaja();

  asignarTextoElemento("h1", `Adivina el número del 1 al ${maxNumero}`);
  asignarTextoElemento("p", "Ingresa un número y presiona 'Intentar'");
  document.getElementById("verificarInput").removeAttribute("disabled");
  document.getElementById("verificar").removeAttribute("disabled");
  document.getElementById("reiniciar").setAttribute("disabled", "true");
}

// Verifica si el input está vacío o no válido antes de intentar
function verificarIntento() {
  const intentoUsuario = parseInt(document.getElementById("verificarInput").value);

  if (isNaN(intentoUsuario)) {
    asignarTextoElemento("h1", "Por favor, ingresa un número válido.");

    return;
  }

  intentos++;

  if (intentoUsuario === numSecreto) {
    asignarTextoElemento("h1", `¡Felicidades! Adivinaste en ${intentos} ${intentos === 1 ? "intento" : "intentos"}`);
    asignarTextoElemento("p", "¡El juego ha terminado!");
    document.getElementById("verificar").setAttribute("disabled", "true");
    document.getElementById("reiniciar").removeAttribute("disabled");
    document.getElementById("verificarInput").setAttribute("disabled", "true");

    desbloquearSiguienteDificultad(); // Avanza nivel si corresponde

  } else {
    asignarTextoElemento("h1", intentoUsuario > numSecreto ? "El número secreto es menor." : "El número secreto es mayor.");
    asignarTextoElemento("p", "Inténtalo de nuevo.");
    limpiarCaja();
  }
}

// Función para reiniciar el juego sin cambiar dificultad
function reiniciarJuego() {
  generarNumeroSecreto();
}

// Activar dificultad solo si fue desbloqueada
function setDificultad(nuevaDificultad) {
  if (nuevaDificultad > nivelDesbloqueado) {
    asignarTextoElemento("h1","Primero desbloquea el Nivel")
    return;
  }

  maxNumero = nuevaDificultad;
  generarNumeroSecreto();
}

// Desbloquea la siguiente dificultad si ganaste en la actual
function desbloquearSiguienteDificultad() {
  if (nivelDesbloqueado === 10 && maxNumero === 10) {
    nivelDesbloqueado = 50;
    document.getElementById("btn50").removeAttribute("disabled");
  } else if (nivelDesbloqueado === 50 && maxNumero === 50) {
    nivelDesbloqueado = 100;
    document.getElementById("btn100").removeAttribute("disabled");
  }
}

// Ejecutar al cargar la página
window.onload = () => {
  document.getElementById("btn10").removeAttribute("disabled");
  document.getElementById("btn50").setAttribute("disabled", "true");
  document.getElementById("btn100").setAttribute("disabled", "true");
  generarNumeroSecreto(); // Genera con Base 10 por defecto
};
