class DFlipFlop extends CircuitLogic {
  constructor(inputs, outputs) {
    super(inputs, [new Signal(false)]);
    this.dLatch = new DLatch([this.inputs[0], this.outputs[0]],outputs);
    this.risingEdge = false;
  }
  update() {
    if(this.inputs[1].state && !this.risingEdge) {
      this.risingEdge = true;
      this.outputs[0].state = true;
    } else if(!this.inputs[1].state && this.risingEdge) {
      this.risingEdge = false;
    }
    this.dLatch.update();
    this.outputs[0].state = false;
  }
}
