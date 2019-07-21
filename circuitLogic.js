class CircuitLogic {
  constructor() {
    this.gates = [];
  }
  addGate(gate) {
    this.gates.push(gate);
  }
  update() {
    for(let gate of this.gates) {
      gate.update();
    }
  }
}
