const fs = require("node:fs");

try {
  let table = fs
    .readFileSync("./files/day6.txt", "utf-8")
    .split("\r\n")
    .map((x) => x.split(""));

  //   for (let line of table) {
  //     console.log(line);
  //   }

  let loop_count = 0;
  let iteration_count = 0;
  let max_iteration = 50000;

  for (let omega of table.entries()) {
    for (let delta of omega[1].entries()) {
      iteration_count++;
      table[omega[0]][delta[0]] = "#";
      console.log(
        "iniciando loop ",
        [omega[0], delta[0]],
        " - ",
        iteration_count,
        "/",
        130 * 130,
        " - ",
        "loop_counting",
        loop_count
      );

      let count = 0;
      let blocked = false;
      let [x, y] = [0, 0];
      let ns = -1;
      let we = 0;
      let rotate_index = 0;
      let rotaded = false;

      function rotate() {
        const compass = [
          [-1, 0],
          [0, 1],
          [1, 0],
          [0, -1],
        ];
        [ns, we] = compass[rotate_index];
        rotate_index += rotate_index == 3 ? -3 : 1;
        rotaded = true;
      }

      for (let [index, str] of table.entries()) {
        if (str.indexOf("^") >= 0) {
          x = str.indexOf("^");
          y = index;
          break;
        }
      }

      while (!blocked && count <= max_iteration) {
        if (count % 2000 == 0) {
          console.log("count: " + count);
        }
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
          table[y][x] = rotaded ? "+" : ns != 0 ? "|" : "-";
          if (table[y][x] == "+") {
            rotaded = false;
          }
          x = nx;
          y = ny;
          table[y][x] = "^";
          count++;
        }
      }

      if (count == max_iteration) {
        loop_count++;
      }
      /*
      let final_sum = 0;
      for (let line of table) {
        //console.log(JSON.stringify(line.join("")));
        for (let char of line) {
          if (["|", "-", "^", "+"].indexOf(char) >= 0) {
            final_sum++;
          }
        }
      }
        */
    }
  }
} catch (error) {
  console.log(error);
}
