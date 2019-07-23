class AddressRegister extends Module {
  constructor(bus, address, load, reset, clock, programSignal, x, y) {
    super(x, y, 'Address Register');
    this.outputs = createArrayOfSignals(bus.length/2);
    let programAddressBits = createArrayOfSignals(bus.length/2);
    let programAddressOutBits = createArrayOfSignals(bus.length/2);
    let addressFromBus = bus.slice(bus.length/2);
    let bits = addressFromBus.map(function(d) {
      return [d, load];
    });
    super.addGate(new Selector(programAddressBits, this.outputs, programSignal, address));
    for(let i = 0; i < programAddressBits.length; i++) {
      let led = new Led(i*25 + x, y + 25, 10, programAddressBits[i], (Math.pow(2,(programAddressBits.length - i - 1))).toString(), BOTTOM);
      super.addRender(led);
      super.addClick(led);
    }
    let selectorLed = new Led(x + 120, y + 25, 20, programSignal, 'Program', RIGHT);
    super.addRender(selectorLed);
    super.addClick(selectorLed);
    let loadLed = new Led(x, y, 20, load, 'Load', RIGHT);
    super.addRender(loadLed);
    super.addClick(loadLed);
    let resetLed = new Led(x + 60, y, 20, reset, 'reset', RIGHT);
    super.addRender(resetLed);
    super.addPressRelease(resetLed);
    for(let i = 0; i < bits.length; i++) {
      super.addGate(new RegisterBit(bits[i], [this.outputs[i]], clock, reset));
      super.addRender(new Led(i * 25 + x + 250, y + 25, 20, address[i], (Math.pow(2,(bits.length - i - 1))).toString(), BOTTOM));
    }
  }
}
