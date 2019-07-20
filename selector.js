class Selector {
  constructor(aInputs, bInputs, select, outputs) {
    this.selectorBits = [];
    let selectOut = new Signal();
    this.inverter = new Inverter([select], [selectOut]);
    for(let i = 0; i < aInputs.length; i++) {
      this.selectorBits.push(new SelectorBit(aInputs[i], bInputs[i], select, selectOut, outputs[i]));
    }
  }
  update() {
    this.inverter.update();
    for(let selectorBit of this.selectorBits) {
      selectorBit.update();
    }
  }
}
