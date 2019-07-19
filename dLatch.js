class DLatch extends CircuitLogic {
  constructor(inputs, outputs, reset) {
    super(inputs, [new Signal()]);
    this.and1Out = [new Signal()];
    this.and2Out = [new Signal()];
    let orOut = [new Signal()];
    this.or = new OrGate([reset, this.and2Out[0]], orOut)
    this.and1 = new AndGate(this.inputs, this.and1Out);
    this.and2 = new AndGate([this.inputs[1], this.outputs[0]], this.and2Out);
    this.inverter = new Inverter(inputs, this.outputs)
    this.srLatch = new SRLatch([this.and1Out[0], orOut[0]], [outputs[0], new Signal()]);
  }
  update() {
    this.inverter.update();
    this.and1.update();
    this.and2.update();
    this.or.update();
    this.srLatch.update();
  }
}
