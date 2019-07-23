class DecoderThreeToEight extends CircuitLogic {
  constructor(inputs, outputs) {
    super();
    let aInvert = new Signal();
    let bInvert = new Signal();
    let cInvert = new Signal();
    super.addGate(new Inverter([inputs[0]], [aInvert]));
    super.addGate(new Inverter([inputs[1]], [bInvert]));
    super.addGate(new Inverter([inputs[2]], [cInvert]));

    super.addGate(new NandGate([aInvert, bInvert, cInvert], [outputs[0]]));
    super.addGate(new NandGate([inputs[0], bInvert, cInvert], [outputs[1]]));
    super.addGate(new NandGate([aInvert, inputs[1], cInvert], [outputs[2]]));
    super.addGate(new NandGate([inputs[0], inputs[1], cInvert], [outputs[3]]));
    super.addGate(new NandGate([aInvert, bInvert, inputs[2]], [outputs[4]]));
    super.addGate(new NandGate([inputs[0], bInvert, inputs[2]], [outputs[5]]));
    super.addGate(new NandGate([aInvert, inputs[1], inputs[2]], [outputs[6]]));
    super.addGate(new NandGate(inputs, [outputs[7]]));
  }
}
