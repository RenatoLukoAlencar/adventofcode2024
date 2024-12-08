const fs = require("node:fs");

try {
  var data = fs.readFileSync("./files/day3.txt", "utf-8");

  let re = /mul\([0-9]+,[0-9]+\)|do\(\)|don\'t\(\)/g;
  var m;
  var arr = [];
  var total = 0;
  var multiplicar = true;

  do {
    m = re.exec(data);
    if (m) {
      arr.push(m[0]);
    }
  } while (m);

  for (let item of arr) {
    if (item == "do()") {
      multiplicar = true;
    } else if (item == "don't()") {
      multiplicar = false;
    } else {
      if (multiplicar) {
        var splited = item.split(",");
        total +=
          parseInt(splited[0].substring(4)) *
          parseInt(splited[1].substring(0, splited[1].length - 1));
      }
    }
  }
  console.log("total? ", total);
} catch (error) {
  console.error(error);
}
