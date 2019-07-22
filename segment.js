const FADE_MAX = 15;
class Segment {
  constructor(x, y, w, r, signal, ground) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.r = r;
    this.signal = signal;
    this.ground = ground;
    this.fadeTime = 10;
    this.c = color(255, 255, 255, 50);
  }
  render() {
    push();
    translate(this.x, this.y);
    rotate(this.r);
    strokeWeight(5);
    if(this.ground.state) {
      this.fadeTime--;
    }
    if(!this.ground.state && this.signal.state) {
      this.fadeTime = FADE_MAX;
      this.c = color(0, 255, 0);
    } else if(this.fadeTime <= 0) {
      this.c = color(255, 255, 255, 50);
    } else if(this.fadeTime > 0) {
      this.c.setAlpha(map(this.fadeTime, 0, FADE_MAX, 50, 255));
    }
    stroke(this.c);
    line(0, 0, this.w, 0);
    pop();
  }
}
