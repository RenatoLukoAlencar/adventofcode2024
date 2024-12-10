const fs = require("node:fs");

try {
  let data = fs.readFileSync("./files/day9_test.txt", "utf-8").split("");
  let disk = [];
  let id = 0;
  let onoff = 1;

  for (let digit of data) {
    for (let i = 0; i < digit; i++) {
      if (onoff > 0) {
        disk.push(id);
      } else {
        disk.push(".");
      }
    }

    if (onoff > 0) {
      id++;
    }
    onoff *= -1;
  }

  //console.log("disk? \n", disk.join(""));
  let startLenght = disk.length;
  let finished = false;
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

  let sum = 0;
  let mult = 0;

  for (let digit of disk) {
    if (digit == ".") {
      break;
    }
    sum += digit * mult;
    mult++;
  }

  console.log("finalSum? ", sum);
} catch (error) {
  console.log(error);
}
