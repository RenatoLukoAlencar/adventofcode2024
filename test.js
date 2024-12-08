var test = [1, 12, 1,1,1,3,4,5,2,6,7,7,3,2,1,12,3,3,4,5,1,2,3,4,]
var counts = {}

for(var number of test){
    if(!counts[number]){
        var c = test.reduce((total, x) => x == number ? total+1: total, 0)
        counts[number] = c;
    }
}


test.sort((a,b)=> a-b)

console.log(counts)
console.log(test)
console.log(test.reverse())