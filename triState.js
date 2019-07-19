class TriState {
  constructor(inputs, outputs) {
    this.inputs = inputs;
    this.outputs = outputs;
  }
  update() {
    if(this.inputs[1].state) {
      this.outputs[0].state = this.inputs[0].state;
    }
  }
}
