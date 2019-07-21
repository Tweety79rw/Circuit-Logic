class Selector extends CircuitLogic {
  constructor(aInputs, bInputs, select, outputs) {
    super();
    let selectOut = new Signal();
    super.addGate(new Inverter([select], [selectOut]));
    for(let i = 0; i < aInputs.length; i++) {
      super.addGate(new SelectorBit(aInputs[i], bInputs[i], select, selectOut, outputs[i]));
    }
  }
}
