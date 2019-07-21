class FiveCubedTimer extends CircuitLogic {
  constructor(pins) {
    super();
    this.pins = pins;
    let sin = new Signal();
    let rin = new Signal();
    super.addGate(new Comparator(this.pins[1], new Signal(this.pins[7].state*(2/3)), rin));
    super.addGate(new Comparator(new Signal(this.pins[7].state*(1/3)), this.pins[1], sin));
    super.addGate(new SRLatch([sin, rin], [this.pins[2], this.pins[3]]));
  }
}
