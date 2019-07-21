class AdderBit extends CircuitLogic {
  constructor(inputs, carry, outputs) {
    super();
    let xor1Out = new Signal();
    let and1Out = new Signal();
    let and2Out = new Signal();
    super.addGate(new XorGate(inputs, [xor1Out]));
    super.addGate(new XorGate([carry, xor1Out], [outputs[0]]));
    super.addGate(new AndGate([carry, xor1Out], [and1Out]));
    super.addGate(new AndGate(inputs, [and2Out]));
    super.addGate(new OrGate([and1Out, and2Out], [outputs[1]]));
  }
}
