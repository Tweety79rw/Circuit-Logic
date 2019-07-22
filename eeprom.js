class EEPROM {
  constructor(inputs, outputs, filename) {
    let _this = this;
    this.ready = false;
    loadStrings(filename, function(d) {
      _this.rom = d;
      _this.ready = true;
    });
    this.inputs = inputs;
    this.outputs = outputs;
  }
  getAddress() {
    let inString = this.inputs.reduce(function(a,d) {
      a += d.state?'1':'0';
      return a;
    },'');
    return parseInt(inString, 2);
  }
  setOutputs(oString) {
    for(let i = 0; i < oString.length; i++) {
      this.outputs[i].state = (oString[i] === '1'? true: false);
    }
  }
  update() {
    if(this.ready)
      this.setOutputs(this.rom[this.getAddress()]);
  }
}
