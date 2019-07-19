const LEFT = 0;
const RIGHT = 1;
const TOP = 2;
const BOTTOM = 3;
class Led {
  constructor(x, y, w, signal, label, side) {
    this.pos = createVector(x, y);
    this.w = w;
    this.signal = signal;
    this.label = label;
    if(side != null) {
      let sideX = (side === 1? 15: side === 0? -15 - label.length: side === 2 || side === 3? -label.length/2*7: 0);
      let sideY = (side === 3? 25: side === 2? -25: side === 1 || side === 0? 3: 0);
      this.side = {
        x: sideX,
        y: sideY
      };
    }
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
    translate(this.pos.x, this.pos.y);
    if(this.label) {
      stroke(255);
      strokeWeight(1);
      noFill();
      text(this.label, this.side.x, this.side.y);
    }
    strokeWeight(this.w);
    if(this.signal.state) {
      stroke(0, 255, 0);
    } else {
      stroke(255);
    }
    noFill();
    point(0, 0);
    pop();
  }
}
