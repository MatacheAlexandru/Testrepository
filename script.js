// Alegem canvas-ul
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Setăm dimensiunile canvas-ului pentru a se potrivi cu fereastra browser-ului
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Numărul de linii și cuvinte per linie
var numLines = 12;
var wordsPerLineRange = [2, 6];

// Lista cuvintelor pentru a fi afișate
var words = [
  "Hello",
  "World",
  "div",
  "var",
  "function",
  "React",
  "Node.js",
  "Web",
  "SCSS",
  "string",
  "Code",
  "JavaScript",
  "HTML",
  "CSS",
];

// Definim clasa pentru un cuvânt
class FallingWord {
  constructor(x, y, speed, fontSize, word) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.word = word;
    this.fontSize = fontSize;
  }

  // Metoda pentru a desena cuvântul pe canvas
  draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.font = this.fontSize + "px Arial"; // Setăm dimensiunea fontului
    ctx.fillText(this.word, this.x, this.y);
  }

  // Metoda pentru a desena urmele de frână ale cuvântului pe canvas
  drawTrail() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Opacitate redusă pentru urmele de frână
    for (let i = 0; i < 10; i++) {
      // Desenăm 10 urme de frână
      ctx.font = this.fontSize + "px Arial"; // Setăm dimensiunea fontului
      ctx.fillText(this.word, this.x - i * 2, this.y - i * 2); // Dezaliniem cuvântul
    }
  }

  // Metoda pentru a actualiza poziția cuvântului
  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      // Dacă cuvântul a ieșit din ecran, îl reinițializăm în partea de sus
      this.y = 0;
    }
  }
}

// Creăm un array pentru a stoca toate cuvintele căzătoare
var fallingWords = [];

// Funcție pentru a adăuga cuvinte căzătoare în array
function addFallingWords() {
  var lineHeight = canvas.height / numLines;
  for (var line = 0; line < numLines; line++) {
    var wordsPerLine =
      Math.floor(
        Math.random() * (wordsPerLineRange[1] - wordsPerLineRange[0] + 2)
      ) + wordsPerLineRange[0];
    var fontSize = Math.floor(Math.random() * 20) + 40; // Dimensiune aleatoare între 20 și 40

    for (var wordIndex = 0; wordIndex < wordsPerLine; wordIndex++) {
      var x = Math.random() * canvas.width;
      var y = lineHeight * line;
      var speed = 1 + Math.random() * 4; // Viteză între 1 și 3
      var word = randomWord();
      var fallingWord = new FallingWord(x, y, speed, fontSize, word);
      fallingWords.push(fallingWord);
    }
  }
}

// Funcție pentru a genera un cuvânt aleatoriu
function randomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Funcție pentru a desena pe canvas
function draw() {
  // Ștergem canvas-ul
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenăm și actualizăm fiecare cuvânt căzător
  fallingWords.forEach(function (word) {
    word.drawTrail(); // Desenăm urmele de frână
    word.draw(); // Desenăm cuvântul
    word.update(); // Actualizăm poziția cuvântului
  });
}

// Funcție pentru a actualiza canvas-ul la fiecare cadru
function update() {
  draw();
  requestAnimationFrame(update);
}

// Adăugăm cuvinte căzătoare în array
addFallingWords();

// Apelăm funcția de actualizare pentru prima dată
update();

// // Alegem canvas-ul
// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");

// // Setăm dimensiunile canvas-ului pentru a se potrivi cu fereastra browser-ului
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// // Lista cuvintelor pentru a fi afișate
// var words = [
//   "Hello",
//   "World",
//   "div",
//   "var",
//   "function",
//   "React",
//   "Node.js",
//   "Web",
//   "SCSS",
//   "string",
//   "Code",
//   "JavaScript",
//   "HTML",
//   "CSS",
// ];

// // Funcție pentru a genera un cuvânt aleatoriu
// function randomWord() {
//   return words[Math.floor(Math.random() * words.length)];
// }

// // Definim clasa pentru un cuvânt
// class FallingWord {
//   constructor(x, y, speed, fontSize) {
//     this.x = x;
//     this.y = y;
//     this.speed = speed;
//     this.word = randomWord();
//     this.fontSize = fontSize;
//   }

//   // Metoda pentru a desena cuvântul pe canvas
//   draw() {
//     ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
//     ctx.font = this.fontSize + "px Arial"; // Setăm dimensiunea fontului
//     ctx.fillText(this.word, this.x, this.y);
//   }

//   // Metoda pentru a desena urmele de frână ale cuvântului pe canvas
//   drawTrail() {
//     ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Opacitate redusă pentru urmele de frână
//     for (let i = 0; i < 10; i++) {
//       // Desenăm 10 urme de frână
//       ctx.font = this.fontSize + "px Arial"; // Setăm dimensiunea fontului
//       ctx.fillText(this.word, this.x - i * 2, this.y - i * 2); // Dezaliniem cuvântul
//     }
//   }

//   // Metoda pentru a actualiza poziția cuvântului
//   update() {
//     this.y += this.speed;
//     if (this.y > canvas.height) {
//       // Dacă cuvântul a ieșit din ecran, îl reinițializăm în partea de sus
//       this.y = 0;
//       this.word = randomWord();
//     }
//   }
// }

// // Creăm un array pentru a stoca toate cuvintele căzătoare
// var fallingWords = [];

// // Funcție pentru a desena pe canvas
// function draw() {
//   // Ștergem canvas-ul
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   // Desenăm și actualizăm fiecare cuvânt căzător
//   fallingWords.forEach(function (word) {
//     word.drawTrail(); // Desenăm urmele de frână
//     word.draw(); // Desenăm cuvântul
//     word.update(); // Actualizăm poziția cuvântului
//   });
// }

// // Funcție pentru a actualiza canvas-ul la fiecare cadru
// function update() {
//   draw();
//   requestAnimationFrame(update);
// }

// // Adăugăm cuvinte căzătoare în array
// for (var i = 0; i < 100; i++) {
//   var x = Math.random() * canvas.width;
//   var y = Math.random() * canvas.height;
//   var speed = 1.5; // Viteză foarte mică pentru o cădere lentă
//   var fontSize = Math.floor(Math.random() * 20) + 40; // Dimensiune aleatoare între 20 și 40
//   var fallingWord = new FallingWord(x, y, speed, fontSize);
//   fallingWords.push(fallingWord);
// }

// // Apelăm funcția de actualizare pentru prima dată
// update();
