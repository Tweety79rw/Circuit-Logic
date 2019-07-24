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
      programCounter: {
        x: 850,
        y: 30
      },
      registerA:{
        x: 850,
        y: 130
      },
      registerB:{
        x: 850,
        y: 330
      },
      outRegister: {
        x: 850,
        y: 450
      },
      controlSignalsDisplay: {
        x: 800,
        y: 550
      },
      adder:{
        x: 850,
        y: 230
      },
      address: {
        x: 15,
        y: 100
      },
      memory: {
        x: 15,
        y: 200
      },
      memoryInput: {
        x: 15,
        y: 300
      },
      instruction:{
        x: 15,
        y: 450
      }, controlTimer: {
        x: 15,
        y: 550
      }, flags: {
        x: 1100,
        y: 200
      }
    };
    this.x = x;
    this.y = y;
    let address = createArrayOfSignals(4);
    let memoryIn = createArrayOfSignals(8);
    let memoryTriger = new Signal();
    let selectorSignal = new Signal();
    this.bus = createArrayOfSignals(bits);
    this.clockSignals = createArrayOfSignals(2);
    this.flags = createArrayOfSignals(2);
    this.controlSignals = createArrayOfSignals(16);
    this.reset = new Signal();
    this.clock = new Clock(this.clockSignals,
      this.controlSignals[0],
      this.x + this.locations.clock.x,
      this.y + this.locations.clock.x
    );
    this.busDisplay = new Bus(this.bus,
      this.x + this.locations.bus.x,
      this.y + this.locations.bus.y
    );
    this.programCounter = new ProgramCounter(this.bus,
      this.controlSignals[14],
      this.controlSignals[13],
      this.controlSignals[12],
      this.clockSignals[0],
      this.reset,
      this.x + this.locations.programCounter.x,
      this.y + this.locations.programCounter.y
    );
    this.registerA = new Register(this.bus,
      this.controlSignals[6], this.controlSignals[7],
      this.clockSignals[0], this.reset,
      this.x + this.locations.registerA.x,
      this.y + this.locations.registerA.y
    );
    this.registerB = new Register(this.bus,
      this.controlSignals[10], new Signal(),
      this.clockSignals[0], this.reset,
      this.x + this.locations.registerB.x,
      this.y + this.locations.registerB.y
    );
    this.adder = new Adder8Bit(this.registerA.outputs.map(function(d) { return d;}),
      this.registerB.outputs.map(function(d) { return d;}),
      this.controlSignals[9], // subtraction
      this.controlSignals[8], // enable
      this.bus,
      this.x + this.locations.adder.x,
      this.y + this.locations.adder.y
    );
    this.flagsReg = new FlagsReg(this.adder.flags,
      this.flags,
      this.controlSignals[15],
      this.clockSignals[0],
      this.reset,
      this.x + this.locations.flags.x,
      this.y + this.locations.flags.y
    );
    this.addressRegister = new AddressRegister(this.bus,
      address,
      this.controlSignals[1],
      this.reset,
      this.clockSignals[0],
      selectorSignal,
      this.x + this.locations.address.x,
      this.y + this.locations.address.y
    );
    this.memory = new Memory(memoryIn,
      this.bus,
      address,
      [this.controlSignals[2], this.controlSignals[3], this.reset],
      selectorSignal,
      memoryTriger,
      this.x + this.locations.memory.x,
      this.y + this.locations.memory.y
    );
    this.memoryInput = new MemoryInput(this.bus,
      memoryIn,
      selectorSignal,
      memoryTriger,
      this.clockSignals[0],
      this.x + this.locations.memoryInput.x,
      this.y + this.locations.memoryInput.y
    );
    this.instruction = new InstructionRegister(this.bus,
      [this.controlSignals[5], this.controlSignals[4], this.reset],
      this.clockSignals[0],
      this.x + this.locations.instruction.x,
      this.y + this.locations.instruction.y
    );
    this.outRegister = new OutRegister(this.bus,
      this.controlSignals[11],
      this.reset,
      this.clockSignals[0],
      this.x + this.locations.outRegister.x,
      this.y + this.locations.outRegister.y
    );
    this.controlSignalsDisplay = new ControlSignal(this.controlSignals,
      this.x + this.locations.controlSignalsDisplay.x,
      this.y + this.locations.controlSignalsDisplay.y
    );
    this.controlTimer = new ControlTimer(this.clockSignals[0],
      this.instruction.outputs.slice(0, 4),
      this.controlSignals,
      this.flags,
      this.reset,
      this.controlSignals,
      this.x + this.locations.controlTimer.x,
      this.y + this.locations.controlTimer.y
    );
  }
  clicked() {
    this.registerA.clicked();
    this.registerB.clicked();
    this.adder.clicked();
    this.busDisplay.clicked();
    this.clock.clicked();
    this.instruction.clicked();
    this.addressRegister.clicked();
    this.memoryInput.clicked();
    this.memory.clicked();
    this.programCounter.clicked();
    this.outRegister.clicked();
  }
  mousePressed() {
    this.clock.mousePressed();
    this.registerA.mousePressed();
    this.registerB.mousePressed();
    this.instruction.mousePressed();
    this.addressRegister.mousePressed();
    this.memoryInput.mousePressed();
    this.memory.mousePressed();
    this.programCounter.mousePressed();
    this.outRegister.mousePressed();
  }
  mouseReleased() {
    this.clock.mouseReleased();
    this.registerA.mouseReleased();
    this.registerB.mouseReleased();
    this.instruction.mouseReleased();
    this.addressRegister.mouseReleased();
    this.memoryInput.mouseReleased();
    this.memory.mouseReleased();
    this.programCounter.mouseReleased();
    this.outRegister.mouseReleased();
  }
  update() {
    this.clock.update();
    this.controlTimer.update();
    this.programCounter.update();
    this.addressRegister.update();
    this.memoryInput.update();
    this.memory.update();
    this.adder.update();
    this.registerA.update();
    this.registerB.update();
    this.flagsReg.update();
    this.instruction.update();
    this.outRegister.update();
  }
  render() {
    this.clock.render();
    this.programCounter.render();
    this.busDisplay.render();
    this.registerA.render();
    this.registerB.render();
    this.adder.render();
    this.addressRegister.render();
    this.memoryInput.render();
    this.memory.render();
    this.instruction.render();
    this.outRegister.render();
    this.controlSignalsDisplay.render();
    this.controlTimer.render();
    this.flagsReg.render();
  }
}
