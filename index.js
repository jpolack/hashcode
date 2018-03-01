const FileReader = require("./fileReader")
const FileWriter = require("./fileWriter")
const turn = require("./turn")
const kmeans = require("./kmeans")

const input = FileReader(process.argv[2])

// const clusters = kmeans.clusterRideStarts(input.rides)
const clusters = {
    clusters: [
        [{
            pos: {
                x: 0,
                y: 0
            },
            id: 0
        }],
        [{
            pos: {
                x: 1,
                y: 2
            },
            id: 1
        }],
        [{
            pos: {
                x: 2,
                y: 0
            },
            id: 2
        }]
    ],
    centroids: [{
        x: 0,
        y: 0
    }, {
        x: 1,
        y: 2
    }, {
        x: 2,
        y: 0
    }]
}

let rides = input.rides
let cars = {
    free: {},
    used: {}
}
for (let i = 0; i < input.meta.cars; i++) {
    cars.free[i] = {
        pos: {
            x: 0,
            y: 0
        },
    }
}

const carRides={}

// for (let i = 0; i < 1; i++) {
for (let i = 0; i < input.meta.turns; i++) {
    const res = turn.do(
        input.meta,
        i,
        rides,
        clusters,
        cars
    )

    for(carId in res.cars.used){
        if(!carRides[carId]){
            carRides[carId] = []
        }
        console.log(carRides)
        carRides[carId].push(res.cars.used[carId].ride)
        delete res.cars.used[carId].ride
    }

    cars = res.cars
    rides = res.rides

    if (rides.length == 0){
        return rides
    }
}
console.log(carRides)

// FileWriter