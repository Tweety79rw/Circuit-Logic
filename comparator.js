class Comparator {
  constructor(positive, negative, output) {
    this.positive = positive;
    this.negative = negative;
    this.output = output;
  }
  update() {
    if(this.positive > this.negative) {
      this.output(true);
    } else {
      this.output(false);
    }
  }
}
