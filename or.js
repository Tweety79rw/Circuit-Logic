class OrGate extends CircuitLogic {
  constructor(inputs, outputs) {
    super(inputs, outputs);
  }
  update() {
    if(this.inputs[0].state || this.inputs[1].state) {
      this.outputs[0].state = true;
    } else {
      this.outputs[0].state = false;
    }
  }
}
