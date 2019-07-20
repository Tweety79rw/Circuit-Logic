class MemoryInput extends Module {
  constructor(bus, outputs, selector, memoryTriger, clock, x, y) {
    super(x, y, 'Memory Input');
    let selectorBitSignals = createArrayOfSignals(8);
    let trigger = new Signal();
    let selectInvert = new Signal();
    this.programLeds = [];
    this.inverter = new Inverter([selector],[selectInvert])
    this.selector = new Selector(selectorBitSignals, bus, selector, outputs);
    this.triggerSelect = new SelectorBit(trigger, clock, selector, selectInvert, memoryTriger);
    this.triggerLed = new Led(x + 250, y + 60, 20, trigger, 'Trigger', BOTTOM);
    for(let i = 0; i < selectorBitSignals.length; i++) {
      this.programLeds.push(new Led(i*25 + x, y + 25, 10, selectorBitSignals[i], (Math.pow(2,(selectorBitSignals.length - i - 1))).toString(), BOTTOM));
    }
  }
  clicked() {
    for(let led of this.programLeds) {
      led.clicked();
    }
  }
  mousePressed() {
    this.triggerLed.mousePressed();
  }
  mouseReleased() {
    this.triggerLed.mouseReleased();
  }
  update() {
    this.inverter.update();
    this.selector.update();
    this.triggerSelect.update();
  }
  render() {
    super.render();
    push();
    this.triggerLed.render();
    for(let led of this.programLeds) {
      led.render();
    }
    pop();
  }
}
