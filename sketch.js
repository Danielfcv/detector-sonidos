// 1. URL de tu modelo (¡hemos añadido model.json al final!)
const modelURL = 'https://teachablemachine.withgoogle.com/models/vddFqxPQn/model.json';

let classifier;
let labelElement;

// 2. Definir los colores para cada clase
// (Puedes cambiar estos códigos hexadecimales por los colores que prefieras)
const colors = {
  'chasquido': '#FFD700', // Amarillo Dorado
  'clap': '#00BFFF',      // Azul Eléctrico
  'ruido de fondo': '#333333' // Gris Oscuro (el default)
};

// Carga el modelo antes de empezar
function preload() {
  classifier = ml5.soundClassifier(modelURL);
}

function setup() {
  noCanvas(); // No necesitamos un lienzo de dibujo
  labelElement = select('#label');
  labelElement.html('Haz clic para activar el micrófono...');
}

// Inicia la clasificación cuando el usuario hace clic
// (Los navegadores requieren interacción del usuario para activar el audio)
function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    labelElement.html('Escuchando...');
    
    // Inicia la clasificación
    classifier.classify(gotResults);
  }
}

// 4. La función que se ejecuta cuando el modelo detecta algo
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  // Obtiene el nombre de la clase detectada (ej: 'clap')
  let label = results[0].label;
  
  // Actualiza el texto en la página
  labelElement.html(label);
  
  // 5. CAMBIA EL COLOR
  // Busca el color correspondiente a la etiqueta en nuestro objeto 'colors'
  // Si no lo encuentra, usa el color de 'ruido de fondo'
  let newColor = colors[label] || colors['ruido de fondo'];
  
  // Aplica el color al fondo (al 'body' del HTML)
  document.body.style.backgroundColor = newColor;
}
