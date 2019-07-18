class FiveCubedTimer {
  constructor(pins) {
    this.pins = pins;
    let sin = new Signal();
    let rin = new Signal();
    this.compareHigh = new Comparator(this.pins[1], new Signal(this.pins[7].state*(2/3)), rin);
    this.compareLow = new Comparator(new Signal(this.pins[7].state*(1/3)), this.pins[1], sin);
    this.srLatch = new SRLatch([sin, rin], [this.pins[2], this.pins[3]]);
  }
  update() {
    this.compareHigh.update();
    this.compareLow.update();
    this.srLatch.update();
  }
}
