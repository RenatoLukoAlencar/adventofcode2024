const fs = require("node:fs");

try {
  let data = fs.readFileSync("./files/day5.txt", "utf-8").split("\n");
  let rules = {};
  let updates = [];

  let approved_updates = [];
  let rejected_updates = [];
  let corrected_updates = [];

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

  function getRules(page) {
    return rules[page] || [];
  }

  function check(update) {
    let res = {
      status: true,
      missplace: [],
    };

    for (let page of update) {
      //console.log("page: ", page);
      //console.log("rules for", page, "are", getRules(page));

      for (let r of getRules(page)) {
        let main = update.indexOf(page);
        let current = update.indexOf(r);
        //console.log("main? ", main, "current? ", current);
        if (main > current && current >= 0) {
          res.status = false;
          if (res.missplace.indexOf(page) == -1) res.missplace.push(page);
          //console.log("page", r, "comes before page", page);
        }
      }
    }
    return res;
  }

  // console.log("rules: ", rules);

  for (let update of updates) {
    //console.log("update: ", update);
    let checked = check(update);
    if (checked.status) {
      approved_updates.push(update);
    } else {
      //console.log("update? ", update, "missplace? ", checked.missplace);
      let current = update.slice(0);
      let newArr = [current.shift()];

      for (let number of current) {
        //console.log("init rebuild ", number, "rules", getRules(number));
        let newIndex = 1000;

        for (let r of getRules(number)) {
          if (newArr.indexOf(r) != -1 && newArr.indexOf(r) < newIndex) {
            newIndex = newArr.indexOf(r);
          }
        }
        if (newIndex != 1000) {
          newArr.splice(newIndex, 0, number);
        } else {
          newArr.push(number);
        }
      }
      if (check(newArr).status) {
        corrected_updates.push(newArr);
      } else {
        rejected_updates.push(newArr);
      }
    }
  }

  //console.log("approved", approved_updates);
  //console.log("corrected", corrected_updates);
  //console.log("rejected", rejected_updates);

  let middle_sum = 0;
  for (let app of approved_updates) {
    middle_sum += parseInt(app[parseInt(app.length / 2)]);
  }
  console.log("approved_middle_sum: ", middle_sum);

  let corrected_sum = 0;
  for (let app of corrected_updates) {
    corrected_sum += parseInt(app[parseInt(app.length / 2)]);
  }
  console.log("corrected_middle_sum: ", corrected_sum);
} catch (error) {
  console.error(error);
}
