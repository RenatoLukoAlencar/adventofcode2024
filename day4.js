const fs = require("node:fs");

try {
  let data = fs
    .readFileSync("./files/day4.txt", "utf-8")
    .split("\n")
    .map((x) => x.replace(" ", "").replace("\n", "").split(""));
  let count = 0;

  let [x, y] = [data[0].length, data.length];
  var clock = [];
  for (let row = 0; row < y; row++) {
    for (let col = 0; col < x; col++) {
      if (data[row][col] == "X") {
        if (row >= 3) {
          n = [
            "X",
            data[row - 1][col],
            data[row - 2][col],
            data[row - 3][col],
          ].join("");
          clock.push(n);
        }

        if (row > 2 && col <= x) {
          ne = [
            "X",
            data[row - 1][col + 1],
            data[row - 2][col + 2],
            data[row - 3][col + 3],
          ].join("");
          clock.push(ne);
        }

        if (col <= x) {
          e = [
            "X",
            data[row][col + 1],
            data[row][col + 2],
            data[row][col + 3],
          ].join("");
          clock.push(e);
        }
        if (row < y - 3 && col < x) {
          se = [
            "X",
            data[row + 1][col + 1],
            data[row + 2][col + 2],
            data[row + 3][col + 3],
          ].join("");
          clock.push(se);
        }

        if (row < y - 3) {
          s = [
            "X",
            data[row + 1][col],
            data[row + 2][col],
            data[row + 3][col],
          ].join("");
          clock.push(s);
        }

        if (row < y - 3 && col >= 3) {
          sw = [
            "X",
            data[row + 1][col - 1],
            data[row + 2][col - 2],
            data[row + 3][col - 3],
          ].join("");
          clock.push(sw);
        }

        if (col >= 3) {
          w = [
            "X",
            data[row][col - 1],
            data[row][col - 2],
            data[row][col - 3],
          ].join("");
          clock.push(w);
        }
        if (col >= 3 && row >= 3) {
          nw = [
            "X",
            data[row - 1][col - 1],
            data[row - 2][col - 2],
            data[row - 3][col - 3],
          ].join("");
          clock.push(nw);
        }
      }
    }
  }

  count += clock.join("--").match(/XMAS/g).length;

  console.log("count?", count);
} catch (error) {
  console.error(error);
}

