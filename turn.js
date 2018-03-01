const util = require("./util")

exports.findClosestCluster = function (pos, centroids) {
    return centroids.reduce((clostest, centroid, index) => {
        const dist = util.dist(pos, centroid)
        if (clostest.dist > dist) {
            return {
                dist: dist,
                id: index
            }
        }

        return clostest
    }, {
            id: 0,
            dist: Infinity
        })
}

exports.extendRideData = function (rides, currentPos, turn) {
    return rides.map((ride) => {
        const distToStart = util.dist(ride.start, currentPos)
        const distRide = util.dist(ride.start, ride.finish)
        const turnsLeft = ride.finishAt - (turn + distToStart + distRide)

        ride.turnsLeft = turnsLeft
        ride.achievable = (ride.turnsLeft > 0)
        ride.achievableWithBonus = ride.achievable && (turn + distToStart <= ride.startAt)

        return ride
    })
}

exports.findBestRide = function (rides, currentPos, bonus, turn) {
    return rides.reduce((left, ride, index)=>{

    }, {
        turnsLeft: Infinity,
        index: 0, 
    }).index
}

exports.do = function (meta, turn, rides, kmeans, cars) {
    for (carId in cars.free) {
        const car = cars.free[carId]
        const clostestCluster = exports.findClosestCluster(car.pos, kmeans.centroids)
        const ridesInCluster = kmeans.clusters[clostestCluster.id]


    }
}