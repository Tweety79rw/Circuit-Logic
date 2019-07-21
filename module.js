class Module extends CircuitLogic {
  constructor(x, y, label) {
    super();
    this.renders = [];
    this.clickers = [];
    this.mousePressers = [];
    this.mouseReleasers = [];
    this.x = x;
    this.y = y;
    this.label = label;
  }
  addRender(toRender) {
    this.renders.push(toRender);
  }
  addClick(toClick) {
    this.clickers.push(toClick);
  }
  addPress(toPress) {
    this.mousePressers.push(toPress);
  }
  addRelease(toRelease) {
    this.mouseReleasers.push(toRelease);
  }
  addPressRelease(toPressRelease) {
    this.mousePressers.push(toPressRelease);
    this.mouseReleasers.push(toPressRelease);
  }
  clicked() {
    for(let cl of this.clickers) {
      cl.clicked();
    }
  }
  mousePressed() {
    for(let press of this.mousePressers) {
      press.mousePressed();
    }
  }
  mouseReleased() {
    for(let real of this.mouseReleasers) {
      real.mouseReleased();
    }
  }
  render() {
    push();
    for(let r of this.renders) {
      r.render();
    }
    stroke(255);
    strokeWeight(1);
    noFill();
    text(this.label, this.x + 150, this.y);
    pop();
  }
}
