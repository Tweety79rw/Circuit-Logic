class Clock {
  constructor(out, x, y) {
    this.x = x;
    this.y = y;
    this.voltage = new Signal(0);
    this.runSignal = new Signal();
    this.stepSignal = new Signal();
    this.led = new Led(this.x + 5, this.y + 10, 20, out[0]);
    this.run = new Led(this.x + 5, this.y + 35, 20, this.runSignal);
    this.step = new Led(this.x + 5, this.y + 60, 20, this.stepSignal);
    this.pins = [
      new Signal(0), this.voltage, out[0], out[1],
      new Signal(0), this.voltage, new Signal(0), new Signal(5)
    ];
    this.fiver = new FiveCubedTimer(this.pins);
    let slider = createSlider(0.01, 3.5, 0.1, 0.001);
    slider.parent(createDiv('Clock Speed'));
    this.adder = 0.1;
    let _this = this;
    slider.input(function(d) {
      _this.adder = this.value();
    })
  }
  clicked() {
    this.run.clicked();
  }
  mousePressed() {
    this.step.mousePressed();
  }
  mouseReleased() {
    this.step.mouseReleased();
  }
  update() {
    if(this.runSignal.state) {
      if(!this.pins[3].state) {
        this.voltage.state += this.adder;
      } else {
        this.voltage.state -= this.adder;
      }
      this.fiver.update();
    } else {
      this.pins[2].state = this.stepSignal.state;
    }
  }
  render() {
    push();
    this.led.render();
    this.run.render();
    this.step.render();
    stroke(255);
    strokeWeight(1);
    noFill();
    text('Clock', this.x + 20, this.y + 15);
    text('Run', this.x + 20, this.y + 40);
    text('Step', this.x + 20, this.y + 65);
    pop();
  }
}
