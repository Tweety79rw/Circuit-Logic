class Decoder extends CircuitLogic {
  constructor(inputs, outputs) {
    super();
    let aInvert = new Signal();
    let bInvert = new Signal();
    super.addGate(new Inverter([inputs[0]], [aInvert]));
    super.addGate(new Inverter([inputs[1]], [bInvert]));
    super.addGate(new NandGate([inputs[0], inputs[1]],[outputs[0]]));
    super.addGate(new NandGate([aInvert, inputs[1]],[outputs[2]]));
    super.addGate(new NandGate([inputs[0], bInvert],[outputs[1]]));
    super.addGate(new NandGate([aInvert, bInvert],[outputs[3]]));
  }
}
