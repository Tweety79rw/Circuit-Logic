class Register {
  constructor(bus, load, clock, x, y) {
    this.registerBits = [];
    this.x = x;
    this.y = y;
    let _this = this;
    this.enabled = load[1];
    this.bus = bus;
    this.outputs = [];
    let bits = this.bus.map(function(d) { _this.outputs.push([new Signal()]); return [d, load[0], clock];});
    this.leds = [];
    this.loadLed = new Led(x, y, 20, load[0]);
    this.enabledLed = new Led(x, y + 50, 20, load[1]);
    for(let i = 0; i < bits.length; i++) {
      this.registerBits.push(new RegisterBit(bits[i], this.outputs[i]));
      this.leds.push(new Led(i * 25 + x, y + 25, 20, this.outputs[i][0]));
    }


  }
  clicked() {
    this.loadLed.clicked();
    this.enabledLed.clicked();
  }
  mousePressed() {
    this.loadLed.mousePressed();
    this.enabledLed.mousePressed();
  }
  mouseReleased() {
    this.loadLed.mouseReleased();
    this.enabledLed.mouseReleased();
  }
  update() {
    for(let rb of this.registerBits) {
      rb.update();
    }
    if(this.enabled.state) {
      for(let i = 0; i < this.outputs.length; i++) {
        this.bus[i].state = this.outputs[i][0].state;
      }
    }
  }
  render() {
    if(this.x && this.y) {
      push()
      strokeWeight(1);
      noFill();
      this.loadLed.render();
      this.enabledLed.render();
      text('Load', this.x + 20, this.y);
      text('Enable', this.x + 20, this.y + 60);
      text('Register', this.x + 150, this.y);
      for(let l of this.leds) {
        l.render();
      }
      pop();
    }
  }
}
