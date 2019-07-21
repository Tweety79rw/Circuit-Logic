class Bus extends Module {
  constructor(bus, x, y) {
    super(x, y, 'Bus');
    for(let i = 0; i < bus.length; i++) {
      let led = new Led(i * 25 + x, y + 25, 20, bus[i], (Math.pow(2,(bus.length - i - 1))).toString(), BOTTOM);
      super.addRender(led);
      super.addClick(led);
    }
  }
}
