class Register extends Module {
  constructor(bus, load, enable, clock, reset, x, y) {
    super(x, y, 'Register');
    this.outputs = createArrayOfSignals(bus.length);
    let bits = bus.map(function(d) {
      return [d, load];
    });
    let loadLed = new Led(x, y, 20, load, 'Load', RIGHT);
    let enabledLed = new Led(x, y + 70, 20, enable, 'Enable', RIGHT);
    let resetLed = new Led(x + 60, y, 20, reset, 'reset', RIGHT);
    super.addRender(loadLed);
    super.addRender(enabledLed);
    super.addRender(resetLed);
    super.addClick(loadLed);
    super.addClick(enabledLed);
    super.addPressRelease(resetLed);
    for(let i = 0; i < bits.length; i++) {
      super.addGate(new TriState([this.outputs[i], enable], [bus[i]]));
      super.addGate(new RegisterBit(bits[i], [this.outputs[i]], clock, reset));
      super.addRender(new Led(i * 25 + x, y + 25, 20, this.outputs[i], (Math.pow(2,(bits.length - i - 1))).toString(), BOTTOM));
    }
  }
}
