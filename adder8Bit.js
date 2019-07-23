class Adder8Bit extends Module {
  constructor(aInputs, bInputs, carry, enable, bus, x, y) {
    super(x, y, 'Adder');
    let internal = createArrayOfSignals(aInputs.length);
    let subLed = new Led(x, y, 20, carry, 'Subtract', RIGHT);
    super.addRender(subLed);
    super.addClick(subLed);
    let enabledLed = new Led(x, y + 70, 20, enable, 'Enable', RIGHT);
    super.addRender(enabledLed);
    super.addClick(enabledLed);
    for(let i = 0; i < aInputs.length; i++) {
      super.addRender(new Led(i * 25 + x, y + 25, 20, internal[i], (Math.pow(2,(7 - i))).toString(), BOTTOM));
      super.addGate(new TriState([internal[i], enable], [bus[i]]));
    }
    let xors = [];
    let adders = [];
    for(let i = aInputs.length - 1; i >= 0; i--) {
      let bIn = new Signal();
      xors.push(new XorGate([bInputs[i], subLed.signal], [bIn]));
      let bitCarry = new Signal();
      adders.push(new AdderBit([aInputs[i], bIn], carry, [internal[i], bitCarry]));
      carry = bitCarry;
    }
    this.flags = [carry, new Signal()];
    super.addGate(new NorGate(internal, [this.flags[0]]));

    for(let toAdd of xors) {
      super.addGate(toAdd);
    }
    for(let toAdd of adders) {
      super.addGate(toAdd);
    }
  }
}
