const fs = require('node:fs');
const readline = require('node:readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('./files/day2.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let safes = 0
  let unsafes = 0
  for await (const line of rl) {
    let s = line.split(" ").map(x => parseInt(x))
    let sorted_asc = s.sort((a, b)=> a-b);
    if(line == sorted_asc.join(" ")|| line == sorted_asc.reverse().join(" ")){
        let safe = true

        for(var i = 0 ; i < s.length -1; i++){
            let [a, b] = [s[i], s[i+1]]    
            let diff = a - b

            if(diff > 3 || diff <-3 || diff == 0){
                safe = false
            } 
        } 

        if(safe){
            safes++
        }else{
            unsafes++
        }
    }else{
        unsafes++
    }  
}
  return {safes, unsafes}
}

function rethink(){
    
}


var c = processLineByLine().then(data => {
    console.log("count? ", data)
}); 