const fs = require("node:fs");

try {
  let data = fs.readFileSync("./files/day7.txt", "utf-8").split("\n");

  let possible = [];
  let notPossible = [];

  for (let line of data) {
    let res = check(line);
    if (res.status) {
      possible.push(res.answer);
    } else {
      for (let x = 1; x < res.numbers.length; x++) {
        let temp = res.numbers.slice(0);
        temp.splice(x, 0, "||");
        let concat = temp.join(",").replace(",||,", "||").split(",").join(" ");

        let newLine = String(res.answer) + ":" + concat;
        //console.log("newLine? ", newLine);
        let newTry = check(newLine);
        //console.log("newTry ", newLine, "res? ", JSON.stringify(newTry));
        if (newTry.status) {
          //console.log("new possible? ", concat);
          possible.push(res.answer);
        }
      }
    }
  }

  console.log("possibles? ", possible.join(","));
  console.log(
    "sum? ",
    possible.reduce((x, y) => x + y)
  );
} catch (error) {
  console.log(error);
}

function d2b(dec) {
  return (dec >>> 0).toString(2);
}

function check(line) {
  let temp = line.split(":");
  let op = {
    0: "+",
    1: "*",
  };
  let answer = parseInt(temp[0]);
  let numbers = temp[1].trim().split(" ");
  let qtd = numbers.length - 1;
  let success = false;
  let baseNumber = 0;

  if (numbers.length == 1 && numbers[0].replace("||", "") == answer) {
    return {
      status: true,
      answer: answer,
      numbers: numbers,
    };
  }

  while (String(d2b(baseNumber)).length <= qtd) {
    let bin = String(d2b(baseNumber))
      .padStart(numbers.length - 1, "0")
      .split("")
      .map((x) => op[x]);

    let total = 0;

    for (let n = 0; n < numbers.length; n++) {
      if (n == 0) {
        total = numbers[0].includes("||")
          ? parseInt(numbers[0].replace("||", ""))
          : parseInt(numbers[0]);

        //console.log("total? ", total);
      } else {
        let current = bin.shift();
        //console.log("current operation ? ", total, current, numbers[n]);
        let stepNumber = numbers[n];

        //console.log(stepNumber, ":::::", stepNumber.includes("||"));

        if (current == "+") {
          total = stepNumber.includes("||")
            ? parseInt(
                String(total + parseInt(stepNumber.split("||")[0])) +
                  stepNumber.split("||")[1]
              )
            : total + parseInt(numbers[n]);
        } else {
          total = stepNumber.includes("||")
            ? parseInt(
                String(total * parseInt(stepNumber.split("||")[0])) +
                  stepNumber.split("||")[1]
              )
            : total * parseInt(numbers[n]);
        }

        //console.log("total? ", total);
      }
    }

    if (total == answer) {
      success = true;
      break;
    }
    baseNumber++;
  }

  return {
    status: success,
    answer: answer,
    numbers: numbers,
  };
}

// to low
// 903282850808
