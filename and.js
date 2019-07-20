class AndGate extends CircuitLogic {
  constructor(inputs, outputs) {
    super(inputs, outputs);
  }
  update() {
    let state = true;
    for(let input of this.inputs) {
      state &= input.state;
    }
    if(state) {
      this.outputs[0].state = true;
    } else {
      this.outputs[0].state = false;
    }
  }
}
