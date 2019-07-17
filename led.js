class Led {
  constructor(x, y, w, signal) {
    this.pos = createVector(x, y);
    this.w = w;
    this.signal = signal;
  }
  collision() {
    return mouseX > this.pos.x - this.w / 2
      && mouseX < this.pos.x + this.w / 2
      && mouseY > this.pos.y - this.w / 2
      && mouseY < this.pos.y + this.w / 2;
  }
  mousePressed() {
    if(!this.mouseDown) {
      if(this.collision()) {
        this.mouseDown = true;
        this.signal.state = true;
      }
    }
  }
  mouseReleased() {
    if(this.mouseDown) {
      if(this.collision()) {
        this.mouseDown = false;
        this.signal.state = false;
      }
    }
  }
  clicked() {
    if(this.collision()) {
        this.signal.state = !this.signal.state;
    }
  }
  render() {
    push();
    strokeWeight(this.w);
    if(this.signal.state) {
      stroke(0, 255, 0);
    } else {
      stroke(255);
    }
    noFill();
    point(this.pos.x, this.pos.y);
    pop();
  }
}
