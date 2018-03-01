const fs = require("fs");

const file = fs.readFileSync("./data/input.txt", { encoding: "UTF-8" });

const lines = file
    .split("\n")
    .map(line => line.split(" "));

const a = lines.slice(0, 1)
const b = lines.splice(1, 1 + a[0])

console.log(a, b);