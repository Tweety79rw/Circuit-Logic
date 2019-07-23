class Clock extends Module {
  constructor(out, halt, x, y) {
    super(x, y, 'Clock');
    this.voltage = new Signal(0);
    this.runSignal = new Signal();
    this.stepSignal = new Signal();
    let fiverOut = new Signal();
    let astableOut = new Signal();
    let monoStableOut = new Signal();
    let monoStableInverterOut = new Signal();
    let clockOrStepOut = new Signal();
    let hltInvertOut = new Signal();
    super.addRender(new Led(this.x + 320, this.y + 10, 20, out[0]));
    let run = new Led(this.x + 60, this.y + 10, 20, this.runSignal, 'Run', BOTTOM);
    super.addRender(run);
    super.addClick(run);
    let step = new Led(this.x + 5, this.y + 10, 20, this.stepSignal, 'Step', BOTTOM);
    super.addRender(step);
    super.addPressRelease(step);
    this.pins = [
      new Signal(0), this.voltage, fiverOut, out[1],
      new Signal(0), this.voltage, new Signal(0), new Signal(5)
    ];
    super.addGate(new FiveCubedTimer(this.pins));
    super.addGate(new Inverter([this.runSignal], [monoStableInverterOut]));
    super.addGate(new AndGate([fiverOut, this.runSignal], [astableOut]));
    super.addGate(new AndGate([this.stepSignal, monoStableInverterOut], [monoStableOut]));
    super.addGate(new OrGate([monoStableOut, astableOut],[clockOrStepOut]));
    super.addGate(new Inverter([halt],[hltInvertOut]));
    super.addGate(new AndGate([hltInvertOut, clockOrStepOut], [out[0]]));
    let slider = createSlider(0.01, 0.5, 0.1, 0.001);
    slider.parent(createDiv('Clock Speed'));
    this.adder = 0.1;
    let _this = this;
    slider.input(function(d) {
      _this.adder = this.value();
    })
  }
  update() {
    if(!this.pins[3].state) {
      this.voltage.state += this.adder;
    } else {
      this.voltage.state -= this.adder;
    }
    super.update();
  }
}
