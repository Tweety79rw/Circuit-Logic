class Inputs {
  constructor(x, y, w, signal) {
    this.pos = createVector(x, y);
    this.w = w;
    this.signal = signal;
  }
  clicked() {
    if(mouseX > this.pos.x - this.w/2 && mouseX < this.pos.x + this.w/2 && mouseY > this.pos.y - this.w/2 && mouseY < this.pos.y + this.w/2) {
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
