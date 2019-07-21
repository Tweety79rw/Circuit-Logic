class DFlipFlop extends CircuitLogic {
  constructor(inputs, outputs, clock, reset) {
    super();
    this.clock = clock;
    this.outputs = new Signal();
    super.addGate(new DLatch([inputs[0], this.outputs], outputs, reset));
    this.risingEdge = false;
  }
  update() {
    if(this.clock.state && !this.risingEdge) {
      this.risingEdge = true;
      this.outputs.state = true;
    } else if(!this.clock.state && this.risingEdge) {
      this.risingEdge = false;
    }
    super.update();
    this.outputs.state = false;
  }
}
