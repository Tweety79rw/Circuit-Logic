class MemoryInput extends Module {
  constructor(bus, outputs, selector, memoryTriger, reset, clock, x, y) {
    super(x, y, 'Memory Input');
    this.selectorBitSignals = createArrayOfSignals(8);
    this.trigger = new Signal();
    let selectInvert = new Signal();
    super.addGate(new Inverter([selector],[selectInvert]));
    super.addGate(new Selector(this.selectorBitSignals, bus, selector, outputs));
    super.addGate(new SelectorBit(this.trigger, clock, selector, selectInvert, memoryTriger));
    let triggerLed = new Led(x + 50, y + 80, 20, this.trigger, 'Set Memory', BOTTOM);
    let resetLed = new Led(x + 150, y + 80, 20, reset, 'Reset', BOTTOM);
    super.addRender(triggerLed);
    super.addPressRelease(triggerLed);
    super.addRender(resetLed);
    super.addPressRelease(resetLed);
    for(let i = 0; i < this.selectorBitSignals.length; i++) {
      let led = (new Led(i*25 + x, y + 25, 15, this.selectorBitSignals[i], (Math.pow(2,(this.selectorBitSignals.length - i - 1))).toString(), BOTTOM));
      super.addRender(led);
      super.addClick(led);
    }
  }
}
