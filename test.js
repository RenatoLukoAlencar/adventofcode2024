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

  let chuncks = "";

  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i] != ".") {
      if (chuncks == "") {
        chuncks = String(disk[i]);
      }

      if (disk[i] != disk[i - 1]) {
        console.log("chunck? ", chuncks);

        for (let j = disk.indexOf("."); j <= i; j++) {
          let temp = disk.slice(j, j + chuncks.length);
          if (temp.every((x) => x == ".")) {
            //console.log("j: ", j, "slice: ", temp, "chunk: ", chuncks);
            disk.splice(j, chuncks.length, ...chuncks.split(""));
            disk.splice(
              i,
              chuncks.length,
              ...chuncks.split("").map((x) => ".")
            );

            chuncks = "";

            break;
          }
        }
      }
    }
  }
  console.log("disk  ? ", disk.join(""));

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
    if (digit == ".") {
      break;
    }
    sum += digit * mult;
    mult++;
  }
  console.log("target: ", "00992111777.44.333....5555.6666.....8888..");
  console.log("finalSum? ", sum);
} catch (error) {
  console.log(error);
}
