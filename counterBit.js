class CounterBit extends CircuitLogic {
  constructor(data, notLoad, notEnable, clock, reset, flipOutQArr, flipOutQIArr, outputs) {
    super();
    let nor1Out = new Signal();
    let nor2Out = new Signal();
    let and1Out = new Signal();
    let and2Out = new Signal();
    let and3Out = new Signal();
    let and4Out = new Signal();
    let nor1Invert = new Signal();
    let nor2Invert = new Signal();
    let notReset = new Signal();
    let notData = new Signal();
    super.addGate(new Inverter([data], [notData]));
    super.addGate(new Inverter([reset], [notReset]));
    super.addGate(new AndGate([outputs[0], notEnable, ...flipOutQArr], [and1Out]));
    super.addGate(new AndGate([notLoad, nor2Out], [and2Out]));

    super.addGate(new AndGate([notData, notLoad], [and3Out]));
    super.addGate(new AndGate([outputs[1], notEnable, ...flipOutQArr], [and4Out]));

    super.addGate(new NorGate([and1Out, and2Out], [nor1Out]));
    super.addGate(new NorGate([and3Out, and4Out], [nor2Out]));

    super.addGate(new Inverter([nor1Out], [nor1Invert]));
    super.addGate(new Inverter([nor2Out], [nor2Invert]));

    super.addGate(new JKFlipFlop([nor2Invert, nor1Invert], clock, reset, outputs));
  }
}
