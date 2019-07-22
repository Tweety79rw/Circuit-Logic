class SevenSegment {
  constructor(x, y, signals, ground) {
    this.x = x;
    this.y = y;
    this.segments = [];
    this.segments.push(new Segment(x + 25, y + 45, 1, 0, signals[0], ground));      // decimal point
    this.segments.push(new Segment(x + 5, y + 5, 10, 0, signals[1], ground));       // a
    this.segments.push(new Segment(x + 20, y + 10, 10, PI/2, signals[2], ground));  // b
    this.segments.push(new Segment(x + 20, y + 30, 10, PI/2, signals[3], ground));  // c
    this.segments.push(new Segment(x + 15, y + 45, 10, PI, signals[4], ground));    // d
    this.segments.push(new Segment(x + 0, y + 40, 10, -PI/2, signals[5], ground));  // e
    this.segments.push(new Segment(x + 0, y + 20, 10, -PI/2, signals[6], ground));  // f
    this.segments.push(new Segment(x + 5, y + 25, 10, 0, signals[7], ground));      // g
  }
  render() {
    for(let segment of this.segments) {
      segment.render();
    }
  }
}
