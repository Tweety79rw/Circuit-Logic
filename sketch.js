// let comparator;
// let srLatch;
let comparOut = false;
let bus = [];
let outBus = [];
let inputs = [];
let outputs = [];
let register;
// let srLatchOut = [new Signal(false),new Signal(false)];
let srlatchinputs = [new Signal(false),new Signal(false)];
let mouseDown = false;
function setup() {
  // create a canvas
  createCanvas(600, 600);
  // comparator = new Comparator(5, 4, function(d) {comparOut = d;});
  // srLatch = new SRLatch(srlatchinputs, srLatchOut)
  for(let i = 0; i < 8; i++) {
    bus.push(new Signal(false));
    outBus.push(new Signal(false));
  }
  for(let i = 0; i < bus.length; i++) {
    inputs.push(new Inputs(i*25 + 50, 20, 20, bus[i]));
    outputs.push(new Inputs(i*25 + 50, 60, 20, outBus[i]));
  }
  register = new Register(bus, srlatchinputs[0], srlatchinputs[1], outBus);
}

function mousePressed() {
  if(!mouseDown) {
    mouseDown = true;
    if(mouseX > 0 && mouseX < 20 && mouseY > 0 && mouseY < 20) {
      srlatchinputs[0].state = !srlatchinputs[0].state;
    }
    if(mouseX > 0 && mouseX < 20 && mouseY > 40 && mouseY < 60) {
      srlatchinputs[1].state = true;
    }
    for(let i of inputs) {
      i.clicked();
    }
  }

}
function mouseReleased() {
  if(mouseDown) {
    mouseDown = false;
    //srlatchinputs[0].state = false;
    srlatchinputs[1].state = false;
  }
}

/**
 * p5 draw loop gets called by p5.js
 */
function draw() {
  background(0);
  // comparator.update();
  // srLatch.update();
  strokeWeight(20);
  if(srlatchinputs[0].state) {
    stroke(0, 255, 0);
  } else {
    stroke(255);
  }
  point(10, 10);
  if(srlatchinputs[1].state) {
    stroke(0, 255, 0);
  } else {
    stroke(255);
  }
  point(10, 50);
  stroke(255);
  strokeWeight(1);
  noFill();
  for(let i of inputs) {
    i.render();
  }
  register.update();
  for(let o of outputs) {
    o.render();
  }
  // text(comparOut, 30, 15);
  // text(srLatchOut[0].state, 30, 45);
  // text(srLatchOut[1].state, 30, 65);
}
