class NandGate extends CircuitLogic {
  constructor(inputs, outputs) {
    super();
    let andout = [new Signal()];
    super.addGate(new AndGate(inputs, andout));
    super.addGate(new Inverter(andout, outputs));
  }
}
