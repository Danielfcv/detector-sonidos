// 1. URL de tu modelo
const modelURL = 'https://teachablemachine.withgoogle.com/models/vddFqxPQn/model.json';

let classifier;
let labelElement;

// 2. Definir los colores para cada clase
// Estas son nuestras *suposiciones* de etiquetas
const colors = {
  'chasquido': '#FFD700',      
  'clap': '#00BFFF',         
  'Ruido de fondo': '#333333' 
};

// 3. Definir los nombres a MOSTRAR
const displayNames = {
  'chasquido': 'Chasquido',
  'clap': '¡Aplauso!', 
  'Ruido de fondo': 'Ruido de fondo'
};

function preload() {
  classifier = ml5.soundClassifier(modelURL);
}

function setup() {
  noCanvas();
  labelElement = select('#label');
  labelElement.html('Haz clic para activar el micrófono...');
}

function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    labelElement.html('Escuchando...');
    classifier.classify(gotResults);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  // Obtiene el nombre de la clase *real* del modelo
  let modelLabel = results[0].label;
  
  // ================================================================
  //  LÍNEA DE DIAGNÓSTICO: Imprime la etiqueta en la consola
  console.log("Etiqueta detectada por el modelo:", modelLabel);
  // ================================================================

  // Busca el nombre a *mostrar* en pantalla
  let displayLabel = displayNames[modelLabel] || modelLabel;
  labelElement.html(displayLabel);
  
  // Busca el color usando la etiqueta *real* del modelo
  let newColor = colors[modelLabel] || colors['Ruido de fondo'];
  document.body.style.backgroundColor = newColor;
}
