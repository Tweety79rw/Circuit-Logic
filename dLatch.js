class DLatch extends CircuitLogic {
  constructor(inputs, outputs, reset) {
    super();
    let and1Out = [new Signal()];
    let and2Out = [new Signal()];
    let orOut = [new Signal()];
    let invertedOut = new Signal();
    super.addGate(new Inverter([inputs[0]], [invertedOut]));
    super.addGate(new OrGate([reset, and2Out[0]], orOut));
    super.addGate(new AndGate(inputs, and1Out));
    super.addGate(new AndGate([inputs[1], invertedOut], and2Out));
    super.addGate(new SRLatch([and1Out[0], orOut[0]], [outputs[0], new Signal()]));
  }
}
