class Module {
  constructor(x, y, label) {
    this.x = x;
    this.y = y;
    this.label = label;
  }
  render() {
    push();
    stroke(255);
    strokeWeight(1);
    noFill();
    text(this.label, this.x + 150, this.y);
    pop();
  }
}
