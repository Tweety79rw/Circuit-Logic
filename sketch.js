// let comparator;
// let srLatch;
let comparOut = false;
let bus = [];
let outBus = [];
let inputs = [];

//let outputs = [];
let registerA;
let registerB;
let adder;
let busDisplay;
// let srLatchOut = [new Signal(false),new Signal(false)];
let srlatchinputs = [new Signal(), new Signal(), new Signal()];
let clockLed;
let mouseDown = false;
function setup() {
  // create a canvas
  createCanvas(600, 600);
  // comparator = new Comparator(5, 4, function(d) {comparOut = d;});
  // srLatch = new SRLatch(srlatchinputs, srLatchOut)
  for(let i = 0; i < 8; i++) {
    bus.push(new Signal(false));
  //  outBus.push(new Signal(false));
  }
  for(let i = 0; i < bus.length; i++) {
    inputs.push(new Led(i*25 + 50, 20, 20, bus[i]));
    //outputs.push(new Led(i*25 + 50, 60, 20, outBus[i]));
  }
  clockLed = new Led(15, 50, 20, srlatchinputs[1]);
  busDisplay = new Bus(bus, 100, 40);
  registerA = new Register(bus, [new Signal(), new Signal()], srlatchinputs[1], 350, 60);

  registerB = new Register(bus, [new Signal(), new Signal()], srlatchinputs[1], 350, 350);
  adder = new Adder8Bit(registerA.outputs.map(function(d) { return d[0];}),
    registerB.outputs.map(function(d) { return d[0];}),
    new Signal(),
    [new Signal()],
    bus,
    350,
    200
  );
}

function mousePressed() {
  registerA.clicked();
  registerB.clicked();
  adder.clicked();
  clockLed.mousePressed();
  busDisplay.clicked();
  if(!mouseDown) {
    mouseDown = true;
    if(mouseX > 0 && mouseX < 20 && mouseY > 0 && mouseY < 20) {
      srlatchinputs[0].state = !srlatchinputs[0].state;
    }
    if(mouseX > 0 && mouseX < 20 && mouseY > 40 && mouseY < 60) {
      srlatchinputs[1].state = true;
    }

  }
  // for(let i of inputs) {
  //   i.clicked();
  // }

}
function mouseReleased() {
  // registerA.mouseReleased();
  // registerB.mouseReleased();
  clockLed.mouseReleased();
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
  //strokeWeight(20);
  // if(srlatchinputs[0].state) {
  //   stroke(0, 255, 0);
  // } else {
  //   stroke(255);
  // }
  // point(10, 10);
  text('Clock', 30, 55);
  clockLed.render();
  stroke(255);
  strokeWeight(1);
  noFill();
  // for(let i of inputs) {
  //   i.render();
  // }
  busDisplay.render();
  registerA.update();
  registerB.update();
  registerA.render();
  registerB.render();
  adder.update();
  adder.render();
  // for(let o of outputs) {
  //   o.render();
  // }
  // text(comparOut, 30, 15);
  // text(srLatchOut[0].state, 30, 45);
  // text(srLatchOut[1].state, 30, 65);
}
