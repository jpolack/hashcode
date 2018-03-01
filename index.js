const FileReader = require("./fileReader")

const input = FileReader(process.argv[2])

console.log(input.rides)