class MemoryInput extends Module {
  constructor(bus, outputs, selector, memoryTriger, clock, x, y) {
    super(x, y, 'Memory Input');
    let selectorBitSignals = createArrayOfSignals(8);
    let trigger = new Signal();
    let selectInvert = new Signal();
    super.addGate(new Inverter([selector],[selectInvert]));
    super.addGate(new Selector(selectorBitSignals, bus, selector, outputs));
    super.addGate(new SelectorBit(trigger, clock, selector, selectInvert, memoryTriger));
    let triggerLed = new Led(x + 250, y + 60, 20, trigger, 'Trigger', BOTTOM);
    super.addRender(triggerLed);
    super.addPressRelease(triggerLed);
    for(let i = 0; i < selectorBitSignals.length; i++) {
      let led = (new Led(i*25 + x, y + 25, 10, selectorBitSignals[i], (Math.pow(2,(selectorBitSignals.length - i - 1))).toString(), BOTTOM));
      super.addRender(led);
      super.addClick(led);
    }
  }
}
