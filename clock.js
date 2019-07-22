class Clock {
  constructor(out, x, y) {
    this.x = x;
    this.y = y;
    this.voltage = new Signal(0);
    this.runSignal = new Signal();
    this.stepSignal = new Signal();
    let fiverOut = new Signal();
    let astableOut = new Signal();
    let monoStableOut = new Signal();
    let monoStableInverterOut = new Signal();
    this.led = new Led(this.x + 120, this.y + 10, 20, out[0], 'Clock', BOTTOM);
    this.run = new Led(this.x + 60, this.y + 10, 20, this.runSignal, 'Run', BOTTOM);
    this.step = new Led(this.x + 5, this.y + 10, 20, this.stepSignal, 'Step', BOTTOM);
    this.or = new OrGate([monoStableOut, astableOut],[out[0]]);
    this.addAstable = new AndGate([fiverOut, this.runSignal], [astableOut]);
    this.monoStableInvert = new Inverter([this.runSignal], [monoStableInverterOut]);
    this.monoStable = new AndGate([this.stepSignal, monoStableInverterOut], [monoStableOut]);
    this.pins = [
      new Signal(0), this.voltage, fiverOut, out[1],
      new Signal(0), this.voltage, new Signal(0), new Signal(5)
    ];
    this.fiver = new FiveCubedTimer(this.pins);
    let slider = createSlider(0.01, 3.5, 0.1, 0.001);
    slider.parent(createDiv('Clock Speed'));
    this.adder = 0.1;
    let _this = this;
    slider.input(function(d) {
      _this.adder = this.value();
    })
  }
  clicked() {
    this.run.clicked();
  }
  mousePressed() {
    this.step.mousePressed();
  }
  mouseReleased() {
    this.step.mouseReleased();
  }
  update() {
    if(!this.pins[3].state) {
      this.voltage.state += this.adder;
    } else {
      this.voltage.state -= this.adder;
    }
    this.fiver.update();
    this.monoStableInvert.update();
    this.addAstable.update();
    this.monoStable.update();
    this.or.update();
  }
  render() {
    push();
    this.led.render();
    this.run.render();
    this.step.render();
    pop();
  }
}
