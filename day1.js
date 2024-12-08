var fs = require("node:fs");

try{
    var data = fs.readFileSync("./files/day1.txt", "utf-8")
    var distance = 0;
    var similarity = 0;
    var past = {};
    var arr1 = [];
    var arr2 = [];


    for( line of data.split("\n")){
        l = line.split("   ");
        arr1.push(l[0]);
        arr2.push(l[1].replace("\r", ""));
    }
    arr1.sort()
    arr2.sort()

    for( var i = 0; i < arr1.length ; i ++){
        var [a, b] =[arr1[i], arr2[i]]

        if(!past[arr2[i]]){
            past[arr2[i]] = 0
        }

        past[arr2[i]] += 1

        distance += (a >= b) ? a-b: b-a;
    }
    

    for( var id of arr1){
        var value = past[id] | 0;
        similarity += id * (value);
    }


    console.log("distance: ", distance)
    console.log("similarity: ", similarity)
}catch(e){
    console.error(e)
}