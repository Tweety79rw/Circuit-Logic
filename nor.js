class NorGate extends CircuitLogic {
  constructor(inputs, outputs) {
    super(null, [new Signal(false)]);
    this.or = new OrGate(inputs, this.outputs);
    this.inverter = new Inverter(this.outputs, outputs);
  }
  update() {
    this.or.update();
    this.inverter.update();
  }
}
