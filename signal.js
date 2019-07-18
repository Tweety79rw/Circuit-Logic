class Signal {
  constructor(state) {
    if(Number.isFinite(state)) {
      this.state = state;
    } else {
      this.state = state || false;
    }
  }
  State(s) {
    if(!s)
      this.state = s;
    return this.state;
  }

}
