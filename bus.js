class Bus extends Module {
  constructor(bus, x, y) {
    super(x, y, 'Bus');
    this.leds = [];
    for(let i = 0; i < bus.length; i++) {
      this.leds.push(new Led(i * 25 + x, y + 25, 20, bus[i], (Math.pow(2,(bus.length - i - 1))).toString(), BOTTOM));
    }
  }
  clicked() {
    for(let i of this.leds) {
      i.clicked();
    }
  }
  mousePressed() {
    for(let i of this.leds) {
      i.mousePressed();
    }
  }
  mouseReleased() {
    for(let i of this.leds) {
      i.mouseReleased();
    }
  }
  render() {
    if(this.x && this.y) {
      push();
      super.render();
      for(let l of this.leds) {
        l.render();
      }
      pop();
    }
  }
}
