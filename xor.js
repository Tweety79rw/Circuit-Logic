class XorGate extends CircuitLogic {
  constructor(inputs, outputs) {
    super();
    let nandOut = new Signal();
    let orOut = new Signal();
    super.addGate(new NandGate(inputs, [nandOut]));
    super.addGate(new OrGate(inputs, [orOut]));
    super.addGate(new AndGate([nandOut, orOut], outputs));
  }
}
