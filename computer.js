const machineCode = {
  'NOP': '0000',
  'LDA': '0001',
  'ADD': '0010',
  'SUB': '0011',
  'STA': '0100',
  'LDI': '0101',
  'JMP': '0110',
  'JC': '0111',
  'JZ': '1000',
  'OUT': '1110',
  'HLT': '1111'
};

class Computer  extends Component {
  constructor(x, y, bits) {
    super(x, y);
    bits = bits || 8;
    let locations = {
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
        x: 50,
        y: 200
      },
      memoryInput: {
        x: 15,
        y: 300
      },
      instruction:{
        x: 15,
        y: 450
      },
      controlTimer: {
        x: 15,
        y: 550
      },
      flags: {
        x: 1100,
        y: 200
      }
    };

    let address = createArrayOfSignals(4);
    let memoryIn = createArrayOfSignals(8);
    let memoryTriger = new Signal();
    let selectorSignal = new Signal();
    let bus = createArrayOfSignals(bits);
    let clockSignals = createArrayOfSignals(2);
    let flags = createArrayOfSignals(2);
    let controlSignals = createArrayOfSignals(16);
    let reset = new Signal();
    let clock = new Clock(clockSignals,
      controlSignals[0],
      x + locations.clock.x,
      y + locations.clock.x
    );
    let busDisplay = new Bus(bus,
      x + locations.bus.x,
      y + locations.bus.y
    );
    let programCounter = new ProgramCounter(bus,
      controlSignals[14],
      controlSignals[13],
      controlSignals[12],
      clockSignals[0],
      reset,
      x + locations.programCounter.x,
      y + locations.programCounter.y
    );
    let registerA = new Register(bus,
      controlSignals[6], controlSignals[7],
      clockSignals[0], reset,
      x + locations.registerA.x,
      y + locations.registerA.y
    );
    let registerB = new Register(bus,
      controlSignals[10], new Signal(),
      clockSignals[0], reset,
      x + locations.registerB.x,
      y + locations.registerB.y
    );
    let adder = new Adder8Bit(registerA.outputs.map(function(d) { return d;}),
      registerB.outputs.map(function(d) { return d;}),
      controlSignals[9], // subtraction
      controlSignals[8], // enable
      bus,
      x + locations.adder.x,
      y + locations.adder.y
    );
    let flagsReg = new FlagsReg(adder.flags,
      flags,
      controlSignals[15],
      clockSignals[0],
      reset,
      x + locations.flags.x,
      y + locations.flags.y
    );
    let addressRegister = new AddressRegister(bus,
      address,
      controlSignals[1],
      reset,
      clockSignals[0],
      selectorSignal,
      x + locations.address.x,
      y + locations.address.y
    );
    let memory = new Memory(memoryIn,
      bus,
      address,
      [controlSignals[2], controlSignals[3], reset],
      selectorSignal,
      memoryTriger,
      x + locations.memory.x,
      y + locations.memory.y
    );
    let memoryInput = new MemoryInput(bus,
      memoryIn,
      selectorSignal,
      memoryTriger,
      reset,
      clockSignals[0],
      x + locations.memoryInput.x,
      y + locations.memoryInput.y
    );
    let instruction = new InstructionRegister(bus,
      [controlSignals[5], controlSignals[4], reset],
      clockSignals[0],
      x + locations.instruction.x,
      y + locations.instruction.y
    );
    let outRegister = new OutRegister(bus,
      controlSignals[11],
      reset,
      clockSignals[0],
      x + locations.outRegister.x,
      y + locations.outRegister.y
    );
    let controlSignalsDisplay = new ControlSignal(controlSignals,
      x + locations.controlSignalsDisplay.x,
      y + locations.controlSignalsDisplay.y
    );
    let controlTimer = new ControlTimer(clockSignals[0],
      instruction.outputs.slice(0, 4),
      controlSignals,
      flags,
      reset,
      controlSignals,
      x + locations.controlTimer.x,
      y + locations.controlTimer.y
    );
    super.addComponent(clock);
    super.addComponent(controlTimer);
    super.addComponent(programCounter);
    super.addComponent(addressRegister);
    super.addComponent(memoryInput);
    super.addComponent(memory);
    super.addComponent(adder);
    super.addComponent(registerA);
    super.addComponent(registerB);
    super.addComponent(flagsReg);
    super.addComponent(instruction);
    super.addComponent(outRegister);
    super.addComponent(busDisplay);
    super.addComponent(controlSignalsDisplay);
    let addressInputBits = addressRegister.programAddressBits;
    let memoryInputBits = memoryInput.selectorBitSignals;
    let memoryTriggerInput = memoryInput.trigger;
    let _this = this;
    function setStates(signals, n) {
      for(let i = 0; i < n.length; i++) {
        signals[i].state = n[i] === '1'?true:false;
      }
    }
    function setAddress(n) {
      setStates(addressInputBits, n);
    }
    function setMemory(n) {
      setStates(memoryInputBits, n);
    }
    function runCode(addressStr, memoryStr) {
      setAddress(addressStr);
      setMemory(memoryStr);
      memoryTriggerInput.state = true;
      _this.update();
      memoryTriggerInput.state = false;
      _this.update();
    }
    let loadButton = createButton('load sample program');
    loadButton.mouseClicked(function() {
      selectorSignal.state = true;
      _this.update();
      runCode('0000','11100000');
      runCode('0001','00101111');
      runCode('0010','01110100');
      runCode('0011','01100000');
      runCode('0100','00111111');
      runCode('0101','11100000');
      runCode('0110','10000000');
      runCode('0111','01100100');
      runCode('1111','00110010');
      selectorSignal.state = false;
      _this.update();
    });
    let textArea = createElement('textArea','');
    let compile = createButton('Compile');
    compile.mouseClicked(function() {
      let lines = textArea.value().split('\n').map(function(d) { return d.split(' ');});
      let errorLines = [];
      for(let i = 0; i < lines.length; i++) {
        if(!machineCode.hasOwnProperty(lines[i][0])) {
          errorLines.push(i + 1);
        }
      }
      if(errorLines.length == 0) {
        selectorSignal.state = true;
        _this.update();
        for(let i = 0; i < lines.length; i++) {
          if(lines[i].length >= 2) {
            runCode((i).toString(2).padStart(4, '0'), machineCode[lines[i][0]] + parseInt(lines[i][1]).toString(2).padStart(4, '0'));
          } else if(lines[i].length == 1) {
            runCode((i).toString(2).padStart(4, '0'), machineCode[lines[i][0]] + (0).toString(2).padStart(4, '0'));
          }
        }
        selectorSignal.state = false;
        _this.update();
      } else {
        console.log('errors on lines', errorLines);
      }

    });
  }
}
