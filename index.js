const FileReader = require("./fileReader")
const turn = require("./turnLogic")
const kmeans = require("./kmeans")

const input = FileReader(process.argv[2])

const clusters = kmeans.clusterRideStarts(input.rides)
clusters.centroids =
    [{
        x: 1,
        y: 1
    }, {
        x: 2,
        y: 2
    }]

const cars = {
    free: {},
    used: {}
}
for (let i = 0; i < input.meta.cars; i++){
    cars.free[i] = {
        pos: {
            x: 0,
            y: 0
        },
    }
}

const turns = []
for (let i = 0; i < input.meta.turns; i++) {
    turns.push(
        turn.do(
            input.meta,
            i,
            input.rides,
            clusters,
            cars
        )
    )
}