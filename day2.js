const fs = require("node:fs");
const readline = require("node:readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("./files/day2.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let safes = 0;
  let unsafes = 0;

  for await (const line of rl) {
    let arr = line.split(" ").map((x) => parseInt(x));
    if (check(arr)) {
      safes++;
    } else {
      let [new_safe, new_unsafe] = [0, 0];

      for (let i = 0; i < arr.length; i++) {
        let test = arr.slice();
        test.splice(i, 1);

        check(test) ? new_safe++ : new_unsafe++;
      }

      new_safe != 0 ? safes++ : unsafes++;
    }
  }
  return { safes, unsafes };
}

function check(s) {
  let sorted_asc = s
    .join()
    .split(",")
    .sort((a, b) => a - b);

  if (
    s.join(" ") === sorted_asc.join(" ") ||
    s.join(" ") === sorted_asc.reverse().join(" ")
  ) {
    for (var i = 0; i < s.length - 1; i++) {
      let [a, b] = [s[i], s[i + 1]];
      let diff = a - b;

      if (diff > 3 || diff < -3 || diff == 0) {
        return false;
      }
    }
  } else {
    return false;
  }

  return true;
}

processLineByLine().then((data) => {
  console.log("count? ", data);
});
