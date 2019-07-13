class RegisterBit {
  constructor(inputs, outputs) {
    let and1Out = [new Signal(false)];
    let and2Out = [new Signal(false)];
    let orOut = [new Signal(false)];
    let inverterOut = [new Signal(false)];
    this.inverter = new Inverter([inputs[1]], inverterOut);
    this.and1 = new AndGate([inputs[0], inputs[1]], and1Out);
    this.and2 = new AndGate([outputs[0], inverterOut[0]], and2Out);
    this.or = new OrGate([and1Out[0], and2Out[0]], orOut);
    this.dFlipFlop = new DFlipFlop([orOut[0], inputs[2]], outputs);
  }
  update() {
    this.inverter.update();
    this.and1.update();
    this.and2.update();
    this.or.update();
    this.dFlipFlop.update();
  }
}
