class Comparator {
  constructor(positive, negative, output) {
    this.positive = positive;
    this.negative = negative;
    this.output = output;
  }
  update() {
    if(this.positive.state > this.negative.state) {
      this.output.state = true;
    } else {
      this.output.state = false;
    }
  }
}
