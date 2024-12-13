function d2b(dec) {
  return (dec >>> 0).toString(2);
}

let count = 15;
console.log(count.toString(16));

console.log(parseInt(count.toString(16), 3));
