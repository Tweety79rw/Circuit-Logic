function createArrayOfSignals(n) {
  let ret = [];
  for(let i = 0; i < n; i++) {
    ret.push(new Signal());
  }
  return ret;
}
let computer;
function setup() {
  // create a canvas
  createCanvas(1200, 800);
  computer = new Computer(0, 0, 8);
  createDiv(`<table>
    <thaed>
    <tr>
      <th>Machine Code</th>
      <th>OP Code</th>
      <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>NOP</td>
      <td>0000</td>
      <td>This is a no operation</td>
    </tr>
    <tr>
      <td>LDA</td>
      <td>0001</td>
      <td>Load a memery location into register A eg.(0001 1110) loads location 14</td>
    </tr>
    <tr>
      <td>ADD</td>
      <td>0010</td>
      <td>Load a memery location into register B adds to register A then takes the results and stores it into register A eg.(0010 1110) adds the value in location 14</td>
    </tr>
    <tr>
      <td>SUB</td>
      <td>0011</td>
      <td>Load a memery location into register B subtracts to register A then takes the results and stores it into register A eg.(0011 1110) subtracts the value in location 14</td>
    </tr>
    <tr>
      <td>STA</td>
      <td>0100</td>
      <td>Stores the value in register A into memory eg.(0100 1110) stores the value in register a into location 14</td>
    </tr>
    <tr>
      <td>LDI</td>
      <td>0101</td>
      <td>Loads the value imeditaly into register A up to a value of 15 eg.(0101 0011) stores the value 3 into register A</td>
    </tr>
    <tr>
      <td>JMP</td>
      <td>0110</td>
      <td>Jumps the program counter to a memory location eg.(0110 0011) the next instuction will be loaded from location 3</td>
    </tr>
    <tr>
      <td>JC</td>
      <td>0111</td>
      <td>If the addition or subtraction doesn't fit into 8 bits it will jump eg.(0111 0011) jumps to location 3 if the carry flag is set</td>
    </tr>
    <tr>
      <td>JZ</td>
      <td>1000</td>
      <td>If the addition or subtraction is zero it will jump eg.(0111 0011) jumps to location 3 if the zero flag is set</td>
    </tr>
    <tr>
      <td></td>
      <td>1001</td>
      <td>Does nothing</td>
    </tr>
    <tr>
      <td></td>
      <td>1010</td>
      <td>Does nothing</td>
    </tr>
    <tr>
      <td></td>
      <td>1011</td>
      <td>Does nothing</td>
    </tr>
    <tr>
      <td></td>
      <td>1100</td>
      <td>Does nothing</td>
    </tr>
    <tr>
      <td></td>
      <td>1101</td>
      <td>Does nothing</td>
    </tr>
    <tr>
      <td>OUT</td>
      <td>1110</td>
      <td>Outputs what is stored in register A into the seven segment display</td>
    </tr>
    <tr>
      <td>HLT</td>
      <td>1111</td>
      <td>Halts the clock</td>
    </tr>
  </tbody>
  </table>`);
}
/**
 * p5 mouse events
 */
function mouseClicked() {
  computer.clicked();
}
function mousePressed() {
  computer.mousePressed();
}
function mouseReleased() {
  computer.mouseReleased();
}
function update() {
  computer.update();
}
/**
 * p5 draw loop gets called by p5.js
 */
function draw() {
  background(0);

  computer.render();
}
setInterval(update, 10);
