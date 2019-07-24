class Component {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ponents = [];
  }
  addComponent(component) {
    this.ponents.push(component);
  }
  update() {
    for(let com of this.ponents) {
      com.update();
    }
  }
  mousePressed() {
    for(let com of this.ponents) {
      com.mousePressed();
    }
  }
  mouseReleased() {
    for(let com of this.ponents) {
      com.mouseReleased();
    }
  }
  render() {
    for(let com of this.ponents) {
      com.render();
    }
  }
  clicked() {
    for(let com of this.ponents) {
      com.clicked();
    }
  }
}
