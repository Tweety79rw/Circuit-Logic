class Adder8Bit extends Module {
  constructor(aInputs, bInputs, carry, enable, outputs, x, y) {
    super(x, y, 'Adder');
    this.adderBits = [];
    this.outputs = outputs;
    this.internal = [];
    this.enabled = enable[0];
    this.subLed = new Led(x, y, 20, carry, 'Subtract', RIGHT);
    this.enabledLed = new Led(x, y + 70, 20, enable[0], 'Enable', RIGHT);
    this.leds = [];
    for(let i = 0; i < 8; i++) {
      this.internal.push(new Signal());
      this.leds.push(new Led(i * 25 + x, y + 25, 20, this.internal[i], (Math.pow(2,(7 - i))).toString(), BOTTOM));
    }
    this.xors = [];
    for(let i = 7; i >= 0; i--) {
      let bIn = new Signal();
      this.xors[i] = new XorGate([bInputs[i],this.subLed.signal], [bIn]);
      let bitCarry = new Signal();
      this.adderBits.push(new AdderBit([aInputs[i], bIn, carry], [this.internal[i], bitCarry]));
      carry = bitCarry;

    }
  }
  clicked() {
    this.enabledLed.clicked();
    this.subLed.clicked();
  }
  update() {
    for(let ors of this.xors) {
      ors.update();
    }
    for(let a of this.adderBits) {
      a.update();
    }
    if(this.enabled.state) {
      for(let i = 0; i < this.internal.length; i++) {
        this.outputs[i].state = this.internal[i].state;
      }
    }
  }
  render() {
    if(this.x && this.y) {
      super.render();
      push();
      this.subLed.render();
      this.enabledLed.render();
      for(let l of this.leds) {
        l.render();
      }
      pop();
    }
  }
}
