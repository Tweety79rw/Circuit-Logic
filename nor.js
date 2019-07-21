class NorGate extends CircuitLogic {
  constructor(inputs, outputs) {
    super();
    let orOut = [new Signal()];
    super.addGate(new OrGate(inputs, orOut));
    super.addGate(new Inverter(orOut, outputs));
  }
}
