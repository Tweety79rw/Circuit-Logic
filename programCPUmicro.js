var fs = require('fs');
const HLT= 0b1000000000000000;
const MI = 0b0100000000000000;
const RI = 0b0010000000000000;
const RO = 0b0001000000000000;
const IO = 0b0000100000000000;
const II = 0b0000010000000000;
const AI = 0b0000001000000000;
const AO = 0b0000000100000000;
const EO = 0b0000000010000000;
const SU = 0b0000000001000000;
const BI = 0b0000000000100000;
const OI = 0b0000000000010000;
const CE = 0b0000000000001000;
const CO = 0b0000000000000100;
const J  = 0b0000000000000010;
const FI = 0b0000000000000001;

const FLAGS_Z0C0 = 0;
const FLAGS_Z0C1 = 1;
const FLAGS_Z1C0 = 2;
const FLAGS_Z1C1 = 3;

const JC = 0b0111;
const JZ = 0b1000;

const TEMPLATE = [
  [MI|CO, RO|II|CE,     0,     0,           0,  0, 0, 0],  // 0000 - NOP
  [MI|CO, RO|II|CE, IO|MI, RO|AI,           0,  0, 0, 0],  // 0001 - lDA
  [MI|CO, RO|II|CE, IO|MI, RO|BI,    EO|AI|FI,  0, 0, 0],  // 0010 - ADD
  [MI|CO, RO|II|CE, IO|MI, RO|BI, SU|EO|AI|FI,  0, 0, 0],  // 0011 - SUB
  [MI|CO, RO|II|CE, IO|MI, AO|RI,           0,  0, 0, 0],  // 0100 - STA
  [MI|CO, RO|II|CE, IO|AI,     0,           0,  0, 0, 0],  // 0101 - LDI
  [MI|CO, RO|II|CE,  IO|J,     0,           0,  0, 0, 0],  // 0110 - JMP
  [MI|CO, RO|II|CE,     0,     0,           0,  0, 0, 0],  // 0111 - JC
  [MI|CO, RO|II|CE,     0,     0,           0,  0, 0, 0],  // 1000 - JZ
  [MI|CO, RO|II|CE,     0,     0,           0,  0, 0, 0],  // 1001 -
  [MI|CO, RO|II|CE,     0,     0,           0,  0, 0, 0],  // 1010 -
  [MI|CO, RO|II|CE,     0,     0,           0,  0, 0, 0],  // 1011 -
  [MI|CO, RO|II|CE,     0,     0,           0,  0, 0, 0],  // 1100 -
  [MI|CO, RO|II|CE,     0,     0,           0,  0, 0, 0],  // 1101 -
  [MI|CO, RO|II|CE, AO|OI,     0,           0,  0, 0, 0],  // 1110 - OUT
  [MI|CO, RO|II|CE,   HLT,     0,           0,  0, 0, 0],  // 1111 - HLT
];
let withFlags = [
  JSON.parse(JSON.stringify(TEMPLATE)), // important to make copies of template and not just put template into the array 4 times
  JSON.parse(JSON.stringify(TEMPLATE)),
  JSON.parse(JSON.stringify(TEMPLATE)),
  JSON.parse(JSON.stringify(TEMPLATE))
];
withFlags[FLAGS_Z0C1][JC][2] = IO|J;
withFlags[FLAGS_Z1C0][JZ][2] = IO|J;
withFlags[FLAGS_Z1C1][JC][2] = IO|J;
withFlags[FLAGS_Z1C1][JZ][2] = IO|J;
let rom = Array(2048).fill('11111111');
function setEeprom(address, value) {
  rom[address] = value;
}
function makeEightRight(val) {
  return val.toString(2).padStart(16, '0').slice(8);
}
function printRom(rom) {
  let print = '';
  let count = 0;
  let first = true;
  for(let r of rom) {
    let s = parseInt(r, 2).toString(16);
    if(!first)
      print += ' ';
    first = false;
    print += s;
    if(count == 8) {
      print += '   ';
    }
    if(count == 16) {
      console.log(print);
      print = '';
      first = true;
      count = 0;
    }
    count++;
  }
}
for(let i = 0; i < 1024; i++) {
  let flags = (i & 0b1100000000) >> 8;
  let byte_sel = (i & 0b0010000000) >> 7;
  let instruction = (i & 0b0001111000) >> 3;
  let step = (i & 0b0000000111);
  if(byte_sel)
    setEeprom(i, makeEightRight(withFlags[flags][instruction][step]));
  else
    setEeprom(i, makeEightRight(withFlags[flags][instruction][step] >> 8));
}

// for(let i = 0; i < data.length; i++) {
//   setEeprom(i+128, makeEightRight(data[i]));
// }
fs.writeFile('control.txt', rom.join('\n'), function(err) {
  if(err) {
    console.log('err', err);
  }
});
// fs.writeFile('rightControl.txt', rom.join('\n'), function(err) {
//   if(err) {
//     console.log('err', err);
//   }
// });
