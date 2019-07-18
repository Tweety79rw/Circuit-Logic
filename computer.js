class Computer {
  constructor(x, y, bits) {
    bits = bits || 8;
    this.locations = {
      clock:{
        x: 15,
        y: 15
      },
      bus:{
        x: 550,
        y: 30
      },
      registerA:{
        x: 850,
        y: 60
      },
      registerB:{
        x: 850,
        y: 350
      },
      adder:{
        x: 850,
        y: 200
      }
    };
    this.x = x;
    this.y = y;
    this.bus = createArrayOfSignals(bits);
    this.clockSignals = createArrayOfSignals(2);
    this.controlSignals = createArrayOfSignals(6);
    this.clock = new Clock(this.clockSignals,
      this.x + this.locations.clock.x,
      this.y + this.locations.clock.x
    );
    this.busDisplay = new Bus(this.bus,
      this.x + this.locations.bus.x,
      this.y + this.locations.bus.y
    );
    this.registerA = new Register(this.bus,
      [this.controlSignals[0], this.controlSignals[1]],
      this.clockSignals[0],
      this.x + this.locations.registerA.x,
      this.y + this.locations.registerA.y
    );
    this.registerB = new Register(this.bus,
      [this.controlSignals[2], this.controlSignals[3]],
      this.clockSignals[0],
      this.x + this.locations.registerB.x,
      this.y + this.locations.registerB.y
    );
    this.adder = new Adder8Bit(this.registerA.outputs.map(function(d) { return d[0];}),
      this.registerB.outputs.map(function(d) { return d[0];}),
      this.controlSignals[4],
      [this.controlSignals[5]],
      this.bus,
      this.x + this.locations.adder.x,
      this.y + this.locations.adder.y
    );

  }
  clicked() {
    this.registerA.clicked();
    this.registerB.clicked();
    this.adder.clicked();
    this.busDisplay.clicked();
    this.clock.clicked();
  }
  mousePressed() {
    this.clock.mousePressed();
  }
  mouseReleased() {
    this.clock.mouseReleased();
  }
  update() {
    this.clock.update();
    this.registerA.update();
    this.registerB.update();
    this.adder.update();
  }
  render() {
    this.clock.render();
    this.busDisplay.render();
    this.registerA.render();
    this.registerB.render();
    this.adder.render();
  }
}
