class Memory extends Module {
  constructor(inputs, bus, address, load, selector, clock, x, y) {
    super(x, y, 'Memory');
    let outs = createArrayOfSignals(Math.pow(2, address.length));
    let memoryOutLoad = new Signal();
    super.addGate(new AddressEncoder(address, outs));
    super.addRender(new Led(x, y, 20, load[0], 'Load', RIGHT));
    super.addRender(new Led(x, y + 70, 20, load[1], 'Enable', RIGHT));
    this.outputs = createArrayOfSignals(8);
    this.tristateByteAnds = [];
    let selectInvert = new Signal();
    super.addGate(new Inverter([selector],[selectInvert]));
    this.memoryLoadSelect = new SelectorBit(new Signal(true), load[0], selector, selectInvert, memoryOutLoad);
    super.addGate(this.memoryLoadSelect);
    for(let i = 0; i < outs.length; i++) {
      let loadOut = new Signal();
      let enableOut = new Signal();
      super.addGate(new AndGate([outs[i], memoryOutLoad], [loadOut]));//load
      for(let j = 0; j < 8; j++) {
        let bitOut = new Signal();
        super.addGate(new TriState([bitOut, outs[i]], [this.outputs[j]]));
        super.addGate(new RegisterBit([inputs[j], loadOut], [bitOut], clock,  new Signal()));
      }
    }
    for(let i = 0; i < this.outputs.length; i++) {
      super.addGate(new TriState([this.outputs[i], load[1]], [bus[i]]));
      super.addRender(new Led(i * 25 + x, y + 25, 20, this.outputs[i], (Math.pow(2,(this.outputs.length - i - 1))).toString(), BOTTOM));
    }
  }
}
