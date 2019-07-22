class OutRegister extends Module {
  constructor(bus, load, reset, clock, x, y) {
    super(x, y, 'Output Display');
    this.outputs = createArrayOfSignals(bus.length);
    let bits = bus.map(function(d) {
      return [d, load];
    });
    let loadLed = new Led(x, y, 20, load, 'Load', RIGHT);
    //let enabledLed = new Led(x, y + 70, 20, enable, 'Enable', RIGHT);
    let resetLed = new Led(x + 60, y, 20, reset, 'reset', RIGHT);
    super.addRender(loadLed);
    // super.addRender(enabledLed);
    super.addRender(resetLed);
    super.addClick(loadLed);
    // super.addClick(enabledLed);
    super.addPressRelease(resetLed);
    for(let i = 0; i < bits.length; i++) {
      // super.addGate(new TriState([this.outputs[i], enable], [bus[i]]));
      super.addGate(new RegisterBit(bits[i], [this.outputs[i]], clock, reset));
      //super.addRender(new Led(i * 25 + x, y + 25, 20, this.outputs[i], (Math.pow(2,(bits.length - i - 1))).toString(), BOTTOM));
    }
    let segmentOuts = createArrayOfSignals(8);

    this.voltage = new Signal(0);
    this.fiverOut = new Signal();
    this.pins = [
      new Signal(0), this.voltage, this.fiverOut, new Signal(),
      new Signal(0), this.voltage, new Signal(0), new Signal(5)
    ];
    //super.addGate(new FiveCubedTimer(this.pins));
    let oneBit = new Signal();
    let twoBit = new Signal();
    super.addGate(new JKFlipFlop([new Signal(true),new Signal(true)], this.fiverOut, new Signal(), [oneBit, new Signal()]));
    super.addGate(new JKFlipFlop([new Signal(true),new Signal(true)], oneBit, new Signal(), [twoBit, new Signal()]));
    // super.addRender(new Led(x + 40, y + 100, 20, oneBit));
    // super.addRender(new Led(x + 10, y + 100, 20, twoBit));
    super.addGate(new EEPROM([twoBit, oneBit, ...this.outputs], segmentOuts, 'sevenSegment.txt'));
    let decodedBits = createArrayOfSignals(4);
    super.addGate(new Decoder([twoBit, oneBit], decodedBits));
    super.addRender(new SevenSegment(x + 160, y + 15, segmentOuts, decodedBits[0]));
    super.addRender(new SevenSegment(x + 200, y + 15, segmentOuts, decodedBits[1]));
    super.addRender(new SevenSegment(x + 240, y + 15, segmentOuts, decodedBits[2]));
    super.addRender(new SevenSegment(x + 280, y + 15, segmentOuts, decodedBits[3]));
  }
  update() {

    // if(!this.pins[3].state) {
    //   this.voltage.state += 3.05;
    // } else {
    //   this.voltage.state -= 3.05;
    // }
    for(let i = 0; i < 2; i++) {
      this.fiverOut.state = !this.fiverOut.state;
      super.update();
    }
  }
}
