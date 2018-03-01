const FileReader = require("./fileReader")
const turn = require("./turn")

const input = FileReader(process.argv[2])

const turns = []
for (let i=0; i<input.meta.turns; i++){
    turns.push(turn(input.meta, i, input.rides))
}

console.log(input)