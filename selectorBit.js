class SelectorBit {
  constructor(aInput, bInput, select, invertSelect, out) {
    this.gates = [];
    let and1Out = new Signal();
    let and2Out = new Signal();
    this.gates.push(new AndGate([aInput, select], [and1Out]));
    this.gates.push(new AndGate([bInput, invertSelect], [and2Out]));
    this.gates.push(new OrGate([and1Out, and2Out], [out]));
  }
  update() {
    for(let gate of this.gates) {
      gate.update();
    }
  }
}
