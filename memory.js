class Memory extends Module {
  constructor(inputs, bus, address, load, selector, clock, x, y) {
    super(x, y, 'Memory');
    // let address = [];
    // for(let i = bus.length/2; i < bus.length; i++) {
    //   address.push(bus[i]);
    // }
    let outs = createArrayOfSignals(Math.pow(2, address.length));
    let memoryOutLoad = new Signal();
    this.addressEncoder = new AddressEncoder(address, outs);
    this.loadAnds = [];
    this.bytes = [];
    this.loadLed = new Led(x, y, 20, load[0], 'Load', RIGHT);
    this.enabledLed = new Led(x, y + 70, 20, load[1], 'Enable', RIGHT);
    //this.resetLed = new Led(x + 60, y, 20, load[2], 'reset', RIGHT);
    this.outputs = createArrayOfSignals(8);
    this.tristateByteAnds = [];
    let selectInvert = new Signal();
    this.inverter = new Inverter([selector],[selectInvert]);
    this.memoryLoadSelect = new SelectorBit(new Signal(true), load[0], selector, selectInvert, memoryOutLoad);
    for(let i = 0; i < outs.length; i++) {
      let loadOut = new Signal();
      let enableOut = new Signal();
      this.loadAnds.push(new AndGate([outs[i], memoryOutLoad], [loadOut]));//load
      let byte = [];

      for(let j = 0; j < 8; j++) {
        let bitOut = new Signal();
        this.tristateByteAnds.push(new TriState([bitOut, outs[i]], [this.outputs[j]]));
        byte.push(new RegisterBit([inputs[j], loadOut, clock], [bitOut],  new Signal()));
      }
      this.bytes.push(byte);
    }
    this.tristateAnds = [];
    this.leds = [];
    for(let i = 0; i < this.outputs.length; i++) {
      this.tristateAnds.push(new TriState([this.outputs[i], load[1]], [bus[i]]));
      this.leds.push(new Led(i * 25 + x, y + 25, 20, this.outputs[i], (Math.pow(2,(this.outputs.length - i - 1))).toString(), BOTTOM));
    }
  }
  clicked() {
    this.loadLed.clicked();
    this.enabledLed.clicked();
  }
  mousePressed() {
    //this.resetLed.mousePressed();
  }
  mouseReleased() {
    //this.resetLed.mouseReleased();
  }
  update() {
    this.addressEncoder.update();
    this.inverter.update();
    this.memoryLoadSelect.update();
    for(let d of this.loadAnds) {
      d.update();
    }
    for(let B of this.bytes) {
      for(let b of B) {
        b.update();
      }
    }
    for(let tt of this.tristateByteAnds) {
      tt.update();
    }
    for(let t of this.tristateAnds) {
      t.update();
    }
  }
  render() {
    super.render();
    push();
    this.loadLed.render();
    this.enabledLed.render();
    //this.resetLed.render();
    for(let l of this.leds) {
      l.render();
    }
    pop();
  }
}
