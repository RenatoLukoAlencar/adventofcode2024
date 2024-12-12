const fs = require("node:fs");

try {
  let table = fs
    .readFileSync("./files/day6.txt", "utf-8")
    .split("\r\n")
    .map((x) => x.split(""));

  //   for (let line of table) {
  //     console.log(line);
  //   }
  let count = 0;
  let blocked = false;
  let [x, y] = [0, 0];
  let ns = -1;
  let we = 0;
  let rotate_index = 0;

  function rotate() {
    const compass = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    [ns, we] = compass[rotate_index];
    rotate_index += rotate_index == 3 ? -3 : 1;
  }

  for (let [index, str] of table.entries()) {
    if (str.indexOf("^") >= 0) {
      x = str.indexOf("^");
      y = index;
      break;
    }
  }

  while (!blocked) {
    //console.log("x", x, "y", y);
    let [ny, nx] = [y + ns, x + we];
    // console.log("nx", nx, "ny", ny);
    if (ny < 0 || ny >= 130 || nx < 0 || nx >= 129) {
      blocked = true;
      break;
    }

    if (table[ny][nx] == "#") {
      rotate();
      [ny, nx] = [y + ns, x + we];
    } else {
      table[y][x] = "O";
      x = nx;
      y = ny;
      table[y][x] = "^";
      count++;
    }
  }

  let final_sum = 0;
  for (let line of table) {
    console.log(JSON.stringify(line.join("")));
    for (let char of line) {
      if (char == "O") {
        final_sum++;
      }
    }
  }
  console.log("sum: ", final_sum, "x", x, "y", y);
} catch (error) {
  console.log(error);
}
