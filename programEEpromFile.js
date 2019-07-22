var fs = require('fs');
const digits = [0x7e, 0x30, 0x6d, 0x79, 0x33, 0x5b, 0x5f, 0x70, 0x7f, 0x7b];
let rom = Array(2048).fill('11111111');
function setEeprom(address, value) {
  rom[address] = value;
}
for(let value = 0; value < 256; value++) {
  setEeprom(value, (digits[value % 10]).toString(2).padStart(8,'0'));
}
for(let value = 0; value < 256; value++) {
  setEeprom(value + 256, (digits[Math.floor(value / 10) % 10]).toString(2).padStart(8, '0'));
}
for(let value = 0; value < 256; value++) {
  setEeprom(value + 512, (digits[Math.floor(value / 100) % 10]).toString(2).padStart(8, '0'));
}
for(let value = 0; value < 256; value++) {
  setEeprom(value + 768, (0).toString(2).padStart(8, '0'));
}

fs.writeFile('sevenSegment.txt', rom.join('\n'), function(err) {
  if(err) {
    console.log('err', err);
  }
})
