const fs = require("node:fs");

try {
  let data = fs.readFileSync("./files/day9.txt", "utf-8").split("");
  let disk = [];
  let id = 0;
  let onoff = 1;

  for (let digit of data) {
    for (let i = 0; i < digit; i++) {
      onoff > 0 ? disk.push(id) : disk.push(".");
    }

    if (onoff > 0) {
      id++;
    }
    onoff *= -1;
  }

  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i] != ".") {
      var startIndex = disk.indexOf(disk[i]);
      var sli = disk.slice(startIndex, i + 1);
      i = startIndex;

      for (let j = disk.indexOf("."); j <= i; j++) {
        if (disk.slice(j, j + sli.length).every((x) => x == ".")) {
          disk.splice(j, sli.length, ...sli);
          disk.splice(i, sli.length, ...".".padEnd(sli.length, ".").split(""));
          break;
        }
      }
    }
  }
  //console.log("disk  ? ", disk.join(""));

  /*
  
  for (let i = 0; i < startLenght; i++) {
    if (disk[i] == ".") {
      for (let j = disk.length - 1; j > i; j--) {
        if (disk[j] != ".") {
          disk.splice(i, 1, disk.splice(j, 1, "."));
          console.log(disk.join(""));
          
          break;
        }
      }
    }
    
    //console.log(disk.join(""));
    if (finished) {
      break;
    }
  }
  */

  let sum = 0;
  let mult = 0;

  for (let digit of disk) {
    if (digit != ".") {
      //console.log("digit: ", digit);
      sum += parseInt(digit) * mult;
    }
    mult++;
  }

  console.log("finalSum? ", sum);
} catch (error) {
  console.log(error);
}
