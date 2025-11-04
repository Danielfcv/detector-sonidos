// 1. URL de tu modelo
const modelURL = 'https://teachablemachine.withgoogle.com/models/vddFqxPQn/model.json';

let classifier;
let labelElement;

// 2. Definir los colores para cada clase
// IMPORTANTE: Las claves DEBEN coincidir EXACTAMENTE con las etiquetas de Teachable Machine
// (Revisé tu modelo: 'chasquido', 'clap', 'Ruido de fondo')
const colors = {
  'chasquido': '#FFD700',      // Amarillo Dorado
  'clap': '#00BFFF',         // Azul Eléctrico
  'Ruido de fondo': '#333333' // <-- ¡ARREGLO! 'R' y 'F' en mayúscula
};

// 3. Definir los nombres a MOSTRAR en pantalla
// (Aquí podemos poner los textos que queramos)
const displayNames = {
  'chasquido': 'Chasquido',
  'clap': '¡Aplauso!', // <-- ¡CAMBIO! Aquí ponemos "Aplauso"
  'Ruido de fondo': 'Ruido de fondo'
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
function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    labelElement.html('Escuchando...');
    
    // Inicia la clasificación
    classifier.classify(gotResults);
  }
}

// 4. La función que se ejecuta cuando el modelo detecta algo (¡ACTUALIZADA!)
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  // Obtiene el nombre de la clase *real* del modelo (ej: 'clap')
  let modelLabel = results[0].label;
  
  // Busca el nombre a *mostrar* en pantalla (ej: '¡Aplauso!')
  let displayLabel = displayNames[modelLabel] || modelLabel;
  
  // Actualiza el texto en la página
  labelElement.html(displayLabel);
  
  // 5. CAMBIA EL COLOR
  // Busca el color usando la etiqueta *real* del modelo (ej: 'clap')
  let newColor = colors[modelLabel] || colors['Ruido de fondo'];
  
  // Aplica el color al fondo (al 'body' del HTML)
  document.body.style.backgroundColor = newColor;
}
