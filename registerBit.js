class RegisterBit extends CircuitLogic {
  constructor(inputs, outputs, clock, reset) {
    super();
    let and1Out = [new Signal(false)];
    let and2Out = [new Signal(false)];
    let orOut = [new Signal(false)];
    let inverterOut = [new Signal(false)];
    super.addGate(new Inverter([inputs[1]], inverterOut));
    super.addGate(new AndGate([inputs[0], inputs[1]], and1Out));
    super.addGate(new AndGate([outputs[0], inverterOut[0]], and2Out));
    super.addGate(new OrGate([and1Out[0], and2Out[0]], orOut));
    super.addGate(new DFlipFlop(orOut, outputs, clock, reset));
  }
}
