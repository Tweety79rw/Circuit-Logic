class NandGate extends CircuitLogic {
  constructor(inputs, outputs) {
    super(null, [new Signal(false)]);
    this.and = new AndGate(inputs, this.outputs);
    this.inverter = new Inverter(this.outputs, outputs);
  }
  update() {
    this.and.update();
    this.inverter.update();
  }
}
