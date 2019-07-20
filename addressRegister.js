class AddressRegister extends Module {
  constructor(bus, address, load, clock, programSignal, x, y) {
    super(x, y, 'Address Register');
    this.registerBits = [];
    let _this = this;
    this.enabled = load[1];
    this.bus = bus;
    this.outputs = [];
    let programAddressBits = createArrayOfSignals(this.bus.length/2);
    let programAddressOutBits = createArrayOfSignals(this.bus.length/2);
    let addressFromBus = this.bus.slice(this.bus.length/2);
    //this.selectorOr = new OrGate()

    let bits = addressFromBus.map(function(d) {
      _this.outputs.push(new Signal());
      return [d, load[0], clock];
    });
    this.selector = new Selector(programAddressBits, _this.outputs, programSignal, address);
    this.leds = [];
    this.programLeds = [];
    for(let i = 0; i < programAddressBits.length; i++) {
      this.programLeds.push(new Led(i*25 + x, y + 25, 10, programAddressBits[i], (Math.pow(2,(programAddressBits.length - i - 1))).toString(), BOTTOM));
    }
    this.selectorLed = new Led(x + 120, y + 25, 20, programSignal, 'Program', RIGHT);
    this.loadLed = new Led(x, y, 20, load[0], 'Load', RIGHT);
    //this.enabledLed = new Led(x, y + 70, 20, load[1], 'Enable', RIGHT);
    this.resetLed = new Led(x + 60, y, 20, load[2], 'reset', RIGHT);
    //this.tristateAnds = [];
    for(let i = 0; i < bits.length; i++) {
    //  this.tristateAnds.push(new TriState([this.outputs[i][0], load[1]], [this.bus[i]]));
      this.registerBits.push(new RegisterBit(bits[i], [_this.outputs[i]], load[2]));
      this.leds.push(new Led(i * 25 + x + 250, y + 25, 20, address[i], (Math.pow(2,(bits.length - i - 1))).toString(), BOTTOM));
    }


  }
  clicked() {
    this.loadLed.clicked();
    this.selectorLed.clicked();
    //this.enabledLed.clicked();
    for(let led of this.programLeds) {
      led.clicked();
    }
  }
  mousePressed() {
    this.resetLed.mousePressed();
  }
  mouseReleased() {
    this.resetLed.mouseReleased();
  }
  update() {
    this.selector.update();
    for(let rb of this.registerBits) {
      rb.update();
    }
    // for(let tri of this.tristateAnds) {
    //   tri.update();
    // }
  }
  render() {
    if(this.x && this.y) {
      super.render();
      push();
      this.loadLed.render();
      this.selectorLed.render();
      //this.enabledLed.render();
      this.resetLed.render();
      for(let l of this.programLeds) {
        l.render();
      }
      for(let l of this.leds) {
        l.render();
      }
      pop();
    }
  }
}
