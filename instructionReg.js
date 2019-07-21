class InstructionRegister extends Module {
  constructor(bus, load, clock, x, y) {
    super(x, y, 'Instruction');
    this.outputs = createArrayOfSignals(bus.length);
    let bits = bus.map(function(d) {
      return [d, load[0]];
    });
    let loadLed = new Led(x, y, 20, load[0], 'Load', RIGHT);
    super.addRender(loadLed);
    super.addClick(loadLed);
    let enabledLed = new Led(x, y + 70, 20, load[1], 'Enable', RIGHT);
    super.addRender(enabledLed);
    super.addClick(enabledLed);
    let resetLed = new Led(x + 60, y, 20, load[2], 'reset', RIGHT);
    super.addRender(resetLed);
    super.addPressRelease(resetLed);
    for(let i = 0; i < bits.length/2; i++) {
      super.addGate(new TriState([new Signal(), load[1]], [bus[i]]));
      super.addGate(new RegisterBit(bits[i], [this.outputs[i]], clock, load[2]));
      super.addRender(new Led(i * 25 + x, y + 25, 20, this.outputs[i], (Math.pow(2,(bits.length - i - 1))).toString(), BOTTOM));
    }
    for(let i = bits.length/2; i < bits.length; i++) {
      super.addGate(new TriState([this.outputs[i], load[1]], [bus[i]]));
      super.addGate(new RegisterBit(bits[i], [this.outputs[i]], clock, load[2]));
      super.addRender(new Led(i * 25 + x, y + 25, 20, this.outputs[i], (Math.pow(2,(bits.length - i - 1))).toString(), BOTTOM));
    }
  }
}
