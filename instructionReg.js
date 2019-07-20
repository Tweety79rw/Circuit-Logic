class InstructionRegister extends Module {
  constructor(bus, load, clock, x, y) {
    super(x, y, 'Instruction');
    this.registerBits = [];
    let _this = this;
    this.enabled = load[1];
    this.bus = bus;
    this.outputs = [];
    let bits = this.bus.map(function(d) {
      _this.outputs.push([new Signal()]);
      return [d, load[0], clock];
    });
    this.leds = [];
    this.loadLed = new Led(x, y, 20, load[0], 'Load', RIGHT);
    this.enabledLed = new Led(x, y + 70, 20, load[1], 'Enable', RIGHT);
    this.resetLed = new Led(x + 60, y, 20, load[2], 'reset', RIGHT);
    this.tristateAnds = [];
    for(let i = 0; i < bits.length/2; i++) {
      this.tristateAnds.push(new TriState([new Signal(), load[1]], [this.bus[i]]));
      this.registerBits.push(new RegisterBit(bits[i], this.outputs[i], load[2]));
      this.leds.push(new Led(i * 25 + x, y + 25, 20, this.outputs[i][0], (Math.pow(2,(bits.length - i - 1))).toString(), BOTTOM));
    }
    for(let i = bits.length/2; i < bits.length; i++) {
      this.tristateAnds.push(new TriState([this.outputs[i][0], load[1]], [this.bus[i]]));
      this.registerBits.push(new RegisterBit(bits[i], this.outputs[i], load[2]));
      this.leds.push(new Led(i * 25 + x, y + 25, 20, this.outputs[i][0], (Math.pow(2,(bits.length - i - 1))).toString(), BOTTOM));
    }
  }
  clicked() {
    this.loadLed.clicked();
    this.enabledLed.clicked();
  }
  mousePressed() {
    this.resetLed.mousePressed();
  }
  mouseReleased() {
    this.resetLed.mouseReleased();
  }
  update() {
    for(let rb of this.registerBits) {
      rb.update();
    }
    for(let tri of this.tristateAnds) {
      tri.update();
    }
  }
  render() {
    if(this.x && this.y) {
      super.render();
      push();
      this.loadLed.render();
      this.enabledLed.render();
      this.resetLed.render();
      for(let l of this.leds) {
        l.render();
      }
      pop();
    }
  }
}
