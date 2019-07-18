function createArrayOfSignals(n) {
  let ret = [];
  for(let i = 0; i < n; i++) {
    ret.push(new Signal());
  }
  return ret;
}
let computer;
function setup() {
  // create a canvas
  createCanvas(1200, 600);
  computer = new Computer(0, 0, 8);
}
/**
 * p5 mouse events
 */
function mouseClicked() {
  computer.clicked();
}
function mousePressed() {
  computer.mousePressed();
}
function mouseReleased() {
  computer.mouseReleased();
}

/**
 * p5 draw loop gets called by p5.js
 */
function draw() {
  background(0);
  computer.update();
  computer.render();
}
