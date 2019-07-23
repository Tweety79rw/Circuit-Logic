const flagLabels = ['CF', 'ZF'];
class FlagsReg extends Module {
  constructor(inputs, outputs, enable, clock, reset, x, y) {
    super(x, y, 'Flags Register')
    for(let i = 0; i < inputs.length; i++) {
      super.addGate(new RegisterBit([inputs[i], enable], [outputs[i]], clock, reset));
      super.addRender(new Led(i * 25 + x + 15, y + 15, 20, outputs[i], flagLabels[i], BOTTOM));
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
    text(this.label, this.x, this.y);
    pop();
  }
}
