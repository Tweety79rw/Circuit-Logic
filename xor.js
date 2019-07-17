class XorGate extends CircuitLogic {
  constructor(inputs, outputs) {
    super(inputs, outputs);
    let nandOut = [new Signal()];
    let orOut = [new Signal()];
    this.nand = new NandGate(inputs, nandOut);
    this.or = new OrGate(inputs, orOut);
    this.and = new AndGate([nandOut[0], orOut[0]], outputs);
  }
  update() {
    this.nand.update();
    this.or.update();
    this.and.update();
  }
}
