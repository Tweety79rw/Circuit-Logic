class DLatch extends CircuitLogic {
  constructor(inputs, outputs) {
    super(inputs, [new Signal(false)]);
    this.and1Out = [new Signal(false)];
    this.and2Out = [new Signal(false)];
    this.and1 = new AndGate(this.inputs, this.and1Out);
    this.and2 = new AndGate([this.inputs[1], this.outputs[0]], this.and2Out);
    this.inverter = new Inverter(inputs, this.outputs)
    this.srLatch = new SRLatch([this.and1Out[0], this.and2Out[0]], outputs);
  }
  update() {
    this.inverter.update();
    this.and1.update();
    this.and2.update();
    this.srLatch.update();
  }
}
