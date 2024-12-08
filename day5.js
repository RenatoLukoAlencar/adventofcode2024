const fs = require("node:fs");

try {
  let data = fs.readFileSync("./files/day5.txt", "utf-8").split("\n");
  let rules = {};
  let updates = [];

  let approved_updates = [];
  for (let line of data) {
    line = line.trim();
    if (line != "") {
      if (line.includes("|")) {
        let r = line.split("|");
        if (!rules[r[0]]) {
          rules[r[0]] = [];
        }

        rules[r[0]].push(r[1]);
      } else {
        updates.push(line.split(","));
      }
    }
  }

  //console.log("rules: ", rules);

  for (let update of updates) {
    let pages_update = update.map((x) => parseInt(x));

    let approved = true;
    for (let page of pages_update) {
      let page_index = update.indexOf(String(page));
      for (let r of rules[page]) {
        let rule_index = update.indexOf(r);

        //console.log("p_index", page_index, "r_index", rule_index);

        if (page_index > rule_index && rule_index != -1) {
          approved = false;
        }
      }
    }

    if (approved) {
      approved_updates.push(update);
    }
  }
  console.log("approved: ", approved_updates.length);

  let middle_sum = 0;

  for (let approved_update of approved_updates) {
    middle_sum += parseInt(
      approved_update[parseInt(approved_update.length / 2)]
    );
  }

  console.log("middle_sum: ", middle_sum);
} catch (error) {
  console.error(error);
}
