class AdderBit {
  constructor(inputs, carry, outputs) {
    let xor1Out = [new Signal()];
    let and1Out = [new Signal()];
    let and2Out = [new Signal()];
    this.xor1 = new XorGate(inputs, xor1Out);
    this.xor2 = new XorGate([carry, xor1Out[0]], [outputs[0]]);
    this.and1 = new AndGate([carry, xor1Out[0]], and1Out);
    this.and2 = new AndGate(inputs, and2Out);
    this.or = new OrGate([and1Out[0], and2Out[0]], [outputs[1]]);
  }
  update() {
    this.xor1.update();
    this.xor2.update();
    this.and1.update();
    this.and2.update();
    this.or.update();
  }
}
