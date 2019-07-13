class SRLatch extends CircuitLogic {
  constructor(inputs, outputs) {
    super(inputs, outputs);
    this.outS = [this.outputs[1]];
    this.outR = [this.outputs[0]];
    this.norS = new NorGate([this.inputs[0], this.outR[0]], this.outS);
    this.norR = new NorGate([this.inputs[1], this.outS[0]], this.outR);
    // this.norS.inputs.push(this.inputs[0]);
    // this.norS.inputs.push(this.norR[0]);
    // this.norR.inputs.push(this.inputs[1])
    // this.norR.inputs.push(this.norS[0])
  }
  update() {
    this.norS.update();
    this.norR.update();
    // if(this.inputs[0]) {
    //   if(this.outputs.length > 0)
    //     this.outputs[0] = true;
    //   if(this.outputs.length > 1)
    //     this.outputs[1] = false;
    // } else if(this.inputs[1]) {
    //   if(this.outputs.length > 0)
    //     this.outputs[0] = false;
    //   if(this.outputs.length > 1)
    //     this.outputs[1] = true;
    // }
  }
}
