class RSFlipFlop extends CircuitLogic {
  constructor(inputs, outputs) {
    super();
    super.addGate(new NandGate([inputs[1], outputs[0]], [outputs[1]]));
    super.addGate(new NandGate([inputs[0], outputs[1]], [outputs[0]]));
  }
}
