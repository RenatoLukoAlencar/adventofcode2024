const fs = require("node:fs");

try {
  let data = fs.readFileSync("./files/day7.txt", "utf-8").split("\n");

  let possible = [];
  let notPossible = [];

  for (let line of data) {
    let res = check(line);
    if (res.status) {
      possible.push(res.answer);
    } 
  }

  console.log("possible: ", possible);
  console.log(
    "sum: ",
    possible.reduce((x, y) => x + y)
  );
} catch (error) {
  console.log(error);
}

function d2b(dec, base) {
  let op = {
    0: "+",
    1: "*",
    2: "||",
  };

  let res = (dec >>> 0)
    .toString(3)
    .padStart(base, "0")
    .split("")
    .map((x) => op[x]);

  return res;
}

function check(line) {
  let temp = line.split(":");
  let answer = parseInt(temp[0]);
  let numbers = temp[1].trim().split(" ");
  let res = {
    status: false,
    answer: answer,
    numbers: numbers,
  };
  //console.log("numbers: ", temp[1]);

  let options = [];
  for (let i = 0; i < 3 ** (numbers.length - 1); i++) {
    options.push(d2b(i, numbers.length - 1));
  }

  for (let op of options) {
    //console.log(op);
    let output = parseInt(numbers[0]);

    for (let o = 0; o < op.length; o++) {
      if (op[o] == "+") {
        output += parseInt(numbers[o + 1]);
      } else if (op[o] == "*") {
        output *= parseInt(numbers[o + 1]);
      } else if (op[o] == "||") {
        output = parseInt(String(output) + "" + String(numbers[o + 1]));
      }
    }

    if (output == answer) {
      return {
        status: true,
        answer: answer,
        numbers: numbers,
      };
    }
  }

  return res;
}
