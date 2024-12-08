const fs = require("node:fs");

try {
  let data = fs
    .readFileSync("./files/day4.txt", "utf-8")
    .split("\n")
    .map((x) => x.replace(" ", "").replace("\n", "").split(""));
  let count = 0;

  let [x, y] = [data[0].length, data.length];
  let all_borders = [];
  let possible_borders = ["MMSS", "MSSM", "SSMM", "SMMS"];

  for (let row = 0; row < y; row++) {
    for (let col = 0; col < x; col++) {
      if (
        data[row][col] == "A" &&
        row >= 1 &&
        row < y - 1 &&
        col >= 1 &&
        col < x - 1
      ) {
        let borders = [
          data[row + 1][col + 1],
          data[row + 1][col - 1],
          data[row - 1][col - 1],
          data[row - 1][col + 1],
        ].join("");
        all_borders.push(borders);
      }
    }
  }

  for (let b of all_borders) {
    if (possible_borders.indexOf(b) > -1) {
      count++;
    }
  }

  console.log("count?", count);
} catch (error) {
  console.error(error);
}
