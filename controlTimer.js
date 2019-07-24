class ControlTimer extends Module {
  constructor(clock, control, signals, flags, reset, controlSignals, x, y) {
    super(x, y, 'Micro Instuction Timer');
    let flipOutQArr = [];
    let flipOutQIArr = [];
    let clockInvert = new Signal();
    let resetOut = new Signal();
    let decoderOut = createArrayOfSignals(8);
    let decoderInvertOut = createArrayOfSignals(8);
    for(let i = 0; i < 3; i++) {
      let flipOut = [new Signal(), new Signal()];
      super.addGate(new CounterBit(new Signal(), new Signal(), new Signal(true), clockInvert, resetOut, flipOutQArr, flipOutQIArr, flipOut));
      flipOutQArr.push(flipOut[0]);
      flipOutQIArr.push(flipOut[1]);
      super.addRender(new Led(i * 25 + x, y + 25, 20, flipOut[1], (Math.pow(2,(i))).toString(), BOTTOM));
    }
    for(let i = 0; i < decoderOut.length; i++) {
      super.addGate(new Inverter([decoderOut[i]], [decoderInvertOut[i]]));
    }
    super.addGate(new OrGate([decoderInvertOut[5], reset], [resetOut]));
    super.addGate(new Inverter([clock], [clockInvert]));
    super.addGate(new DecoderThreeToEight(flipOutQIArr, decoderOut));
    for(let i = 0; i < decoderInvertOut.length - 3; i++) {
      super.addRender(new Led(i * 25 + x + 100, y + 25, 20, decoderInvertOut[i], ('T' + i).toString(), BOTTOM))
    }
    super.addGate(new EEPROM([...flags.reverse() ,new Signal(), ...control, ...flipOutQIArr.reverse()], signals.slice(0, 8), 'control.txt'));
    super.addGate(new EEPROM([...flags ,new Signal(true), ...control, ...flipOutQIArr], signals.slice(8), 'control.txt'));
  }
}
