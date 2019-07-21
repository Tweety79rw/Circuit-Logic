class SelectorBit extends CircuitLogic {
  constructor(aInput, bInput, select, invertSelect, out) {
    super();
    let and1Out = new Signal();
    let and2Out = new Signal();
    super.addGate(new AndGate([aInput, select], [and1Out]));
    super.addGate(new AndGate([bInput, invertSelect], [and2Out]));
    super.addGate(new OrGate([and1Out, and2Out], [out]));
  }
}
