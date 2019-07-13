class Capacitor {
  constructor(inputs, outputs) {
    this.inputs = inputs;
    this.output = outputs;
    this.capacitance = 0;
  }
  update() {
    this.capacitance += this.inputs[0];
    this.outputs[0] = this.capacitance;
  }
}
