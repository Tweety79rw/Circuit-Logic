var fs = require('fs');
const digits = [0x7e, 0x30, 0x6d, 0x79, 0x33, 0x5b, 0x5f, 0x70, 0x7f, 0x7b];
let rom = Array(2048).fill('11111111');
function setEeprom(address, value) {
  rom[address] = value;
}
function toTwoComp(val) {
  if(val >= 0)
    return val;
  return ~(((-val) - 1) | ~((1 << 8) - 1));
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
for(let value = -128; value < 128; value++) {
  setEeprom(toTwoComp(value) + 1024, (digits[Math.abs(value) % 10]).toString(2).padStart(8,'0'));
}
for(let value = -128; value < 128; value++) {
  setEeprom(toTwoComp(value) + 1280, (digits[Math.floor(Math.abs(value) / 10) % 10]).toString(2).padStart(8, '0'));
}
for(let value = -128; value < 128; value++) {
  setEeprom(toTwoComp(value) + 1536, (digits[Math.floor(Math.abs(value) / 100) % 10]).toString(2).padStart(8, '0'));
}
for(let value = -128; value < 128; value++) {
  if((value) < 0) {
    setEeprom(toTwoComp(value) + 1792, (1).toString(2).padStart(8, '0'));
  } else {
    setEeprom(toTwoComp(value) + 1792, (0).toString(2).padStart(8, '0'));
  }
}

fs.writeFile('sevenSegment.txt', rom.join('\n'), function(err) {
  if(err) {
    console.log('err', err);
  }
})
