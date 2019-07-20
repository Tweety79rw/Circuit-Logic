class AddressEncoder {
  constructor(inputs, outputs) {
    function dec2bin(dec){
      return (dec).toString(2).padStart(4, '0');
    }
    this.ands = [];
    this.inverters = [];
    let _this = this;
    let inputWInver = inputs.map(function(d) {
      let inverterOut = new Signal();
      _this.inverters.push(new Inverter([d],[inverterOut]));
      return [inverterOut, d];
    })
    for(let i = 0; i < 16; i++) {
      let bits = dec2bin(i);
      let ins = [];
      for(let j = 0; j < bits.length; j++) {
        ins.push(inputWInver[j][Number.parseInt(bits[j])]);
      }
      this.ands.push(new AndGate(ins, [outputs[i]]));
    }
  }
  update() {
    for(let inverter of this.inverters) {
      inverter.update();
    }
    for(let a of this.ands) {
      a.update();
    }
  }
}
