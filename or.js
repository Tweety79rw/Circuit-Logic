class OrGate {
  constructor(inputs, outputs) {
    this.inputs = inputs;
    this.outputs = outputs;
  }
  update() {
    let state = false;
    for(let input of this.inputs) {
      state = state || input.state;
    }
    this.outputs[0].state = state;
  }
}
