// 1. URL de tu modelo
const modelURL = 'https://teachablemachine.withgoogle.com/models/duYoQbOrW/model.json';

let classifier;
let labelElement;

// 2. Definir los colores para cada clase
// ¡CORREGIDO! Ahora coincide 100% con la consola (mayúsculas)
const colors = {
  'Chasquido': '#FFD700',      // Amarillo Dorado
  'Clap': '#00BFFF',         // Azul Eléctrico
  'Ruido de fondo': '#333333' // Gris Oscuro
};

// 3. Definir los nombres a MOSTRAR en pantalla
// ¡CORREGIDO!
const displayNames = {
  'Chasquido': 'Chasquido',
  'Clap': '¡Aplauso!', // <-- Aquí sí podemos poner lo que queramos
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

// 4. La función que se ejecuta cuando el modelo detecta algo
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  // Obtiene el nombre de la clase *real* del modelo (ej: 'Clap')
  let modelLabel = results[0].label;
  
  // (Opcional) Puedes borrar o comentar esta línea de diagnóstico
  // console.log("Etiqueta detectada por el modelo:", modelLabel);

  // Busca el nombre a *mostrar* en pantalla (ej: '¡Aplauso!')
  let displayLabel = displayNames[modelLabel] || modelLabel;
  
  // Actualiza el texto en la página
  labelElement.html(displayLabel);
  
  // 5. CAMBIA EL COLOR
  // Busca el color usando la etiqueta *real* del modelo
  let newColor = colors[modelLabel] || colors['Ruido de fondo'];
  
  // Aplica el color al fondo (al 'body' del HTML)
  document.body.style.backgroundColor = newColor;
}
