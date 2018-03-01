const FileReader = require("./fileReader")
const turn = require("./turn")
const kmeans = require("./kmeans")

const input = FileReader(process.argv[2])

const clusters = kmeans.clusterRideStarts(input.rides)
const turns = []
for (let i=0; i<input.meta.turns; i++){
    turns.push(
        turn(
            input.meta,
            i,
            input.rides,
            clusters
        )
    )
}