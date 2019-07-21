class SRLatch extends CircuitLogic {
  constructor(inputs, outputs) {
    super();
    super.addGate(new NorGate([inputs[0], outputs[0]], [outputs[1]]));
    super.addGate(new NorGate([inputs[1], outputs[1]], [outputs[0]]));
  }
}
