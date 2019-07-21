class ProgramCounter extends Module {
  constructor(bus, load, oEnable, cEnable, clock, reset, x, y) {
    super(x, y, 'Program Counter');
    let enableNorOut = new Signal();
    let loadNandOut = new Signal();
    let cEnableInverted = new Signal();
    let loadInvert = new Signal();
    let resetInvert = new Signal();
    let loadLed = new Led(x + 100, y + 25, 20, load, 'Load', RIGHT);
    super.addRender(loadLed);
    super.addClick(loadLed);
    let oEnableLed = new Led(x + 100, y + 60, 20, oEnable, 'Out Enable', RIGHT);
    super.addRender(oEnableLed);
    super.addClick(oEnableLed);
    let cEnableLed = new Led(x + 200, y + 25, 20, cEnable, 'Count Enable', RIGHT);
    cEnable.state = true;
    super.addRender(cEnableLed);
    super.addClick(cEnableLed);
    let resetLed = new Led(x + 200, y + 60, 20, reset, 'Reset', RIGHT);
    super.addRender(resetLed);
    super.addPressRelease(resetLed);
    super.addGate(new Inverter([cEnable], [cEnableInverted]));
    super.addGate(new Inverter([load], [loadInvert]));
    super.addGate(new Inverter([reset], [resetInvert]));
    super.addGate(new NandGate([loadInvert],[loadNandOut]));
    super.addGate(new NorGate([cEnableInverted, loadNandOut],[enableNorOut]));
    let flipOutQArr = [];
    let flipOutQIArr = [];
    for(let i = 7; i >= 4; i--) {
      let flipOut = [new Signal(true), new Signal()];

      super.addGate(new CounterBit(bus[i], loadNandOut, enableNorOut, clock, reset, flipOutQArr, flipOutQIArr, flipOut));
      super.addGate(new TriState([flipOut[1], oEnable], [bus[i]]));

      flipOutQArr.push(flipOut[0]);
      flipOutQIArr.push(flipOut[1]);
    }
    for(let i = 3; i >= 0; i--) {
      super.addGate(new TriState([new Signal(), oEnable], [bus[i]]));
    }
    let invertFlipArr = flipOutQIArr.reverse();
    for(let i = 0; i < invertFlipArr.length; i++) {
      super.addRender(new Led(i * 25 + x, y + 25, 20, invertFlipArr[i], (Math.pow(2,(invertFlipArr.length - i - 1))).toString(), BOTTOM));
    }
  }
}
