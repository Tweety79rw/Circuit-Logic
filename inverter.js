class Inverter {
  constructor(inputs, outputs) {
    this.inputs = inputs;
    this.outputs = outputs;
  }
  update() {
    this.outputs[0].state = !this.inputs[0].state;
  }
}
