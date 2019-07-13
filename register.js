class Register {
  constructor(bus, load, clock, outBus) {
    this.registerBits = [];
    let bits = bus.map(function(d) { return [d, load, clock];});
    let outBits = outBus.map(function(d) { return [d, new Signal(false)];});
    for(let i = 0; i < bits.length; i++) {
      this.registerBits.push(new RegisterBit(bits[i], outBits[i]));
    }
  }
  update() {
    for(let rb of this.registerBits) {
      rb.update();
    }
  }
}
