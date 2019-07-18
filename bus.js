class Bus {
  constructor(bus, x, y) {
    this.x = x;
    this.y = y;
    this.leds = [];
    for(let i = 0; i < bus.length; i++) {
      this.leds.push(new Led(i * 25 + x, y + 25, 20, bus[i]));
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
      stroke(255);
      strokeWeight(1);
      noFill();
      text('Bus', this.x + 150, this.y);
      for(let l of this.leds) {
        l.render();
      }
      pop();
    }
  }
}
