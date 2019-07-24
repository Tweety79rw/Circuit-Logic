const signalLabels = ['HLT', 'MI', 'RI', 'RO', 'IO', 'II', 'AI', 'AO', 'EO', 'SU', 'BI', 'OI', 'CE', 'CO', 'J', 'FI'];
class ControlSignal extends Module {
  constructor(signals, x, y) {
    super(x, y, 'Control Signals');
    for(let i = 0; i < signals.length; i++) {
      super.addRender(new Led(i * 25 + 10 + x, y + 25, 20, signals[i], signalLabels[i], BOTTOM));
    }
  }
}
