class JKFlipFlop extends CircuitLogic {
  constructor(inputs, clock, reset, outputs) {
    super();
    this.outputs = new Signal();
    this.risingEdge = false;
    this.clock = clock;
    let setSignal = new Signal();
    let resetSignal = new Signal();
    let orOut = new Signal();
    let notOr = new Signal();
    let set = new Signal();
    super.addGate(new NandGate([inputs[1], this.outputs, outputs[0]], [resetSignal]));
    super.addGate(new NandGate([inputs[0], this.outputs, outputs[1]], [setSignal]));
    super.addGate(new OrGate([reset, resetSignal], [orOut]));
    super.addGate(new Inverter([reset], [notOr]));
    super.addGate(new AndGate([setSignal, notOr],[set]))
    super.addGate(new RSFlipFlop([set, orOut], outputs));
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
