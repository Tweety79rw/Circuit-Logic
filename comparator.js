class Comparator {
  constructor(positive, negative, output) {
    this.positive = positive;
    this.negative = negative;
    this.output = output;
  }
  update() {
    this.output.state = (this.positive.state > this.negative.state);
    // if(this.positive.state > this.negative.state) {
    //   this.output.state = true;
    // } else {
    //   this.output.state = false;
    // }
  }
}
