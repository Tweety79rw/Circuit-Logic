class Inverter extends CircuitLogic {
  constructor(inputs, outputs) {
    super(inputs, outputs);
  }
  update() {
    this.outputs[0].state = !this.inputs[0].state;
  }
}
