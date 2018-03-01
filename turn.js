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
        const blockedUntil = (turn + distToStart + distRide)
        const turnsLeft = ride.finishAt - blockedUntil

        ride.blockedUntil = blockedUntil
        ride.turnsLeft = turnsLeft
        ride.achievable = (ride.turnsLeft > 0)
        ride.achievableWithBonus = ride.achievable && (turn + distToStart <= ride.startAt)

        return ride
    })
}

exports.findBestRide = function (rides, currentPos, bonus, turn) {
    return rides.reduce((highscore, ride, index)=>{

        if(highscore.turnsLeft>ride.turnsLeft){
            highscore = {
                ride: ride,
                id: index,
                turnsLeft: ride.turnsLeft
            }
        }

        return highscore
    }, {
        ride: undefined,
        turnsLeft: Infinity,
        id: 0, 
    })
}

exports.do = function (meta, turn, rides, kmeans, cars) {
    for (carId in cars.used) {
        const car = cars.used[carId]

        if (turn >= car.blockedUntil){
            cars.free[carId] = car
            delete cars.used[carId]
        }
    }

    for (carId in cars.free) {
        const car = cars.free[carId]
        const clostestCluster = exports.findClosestCluster(car.pos, kmeans.centroids)
        const ridesInCluster = kmeans.clusters[clostestCluster.id].map((r)=>rides[r.id])
        const extendedRides = exports.extendRideData(ridesInCluster, car.pos, turn)

        const bestRide = exports.findBestRide(extendedRides, car.pos, meta.bonus, turn)

        car.blockedUntil = bestRide.ride.blockedUntil
        cars.used[carId] = car
        delete cars.free[carId]
        rides = rides.filter((r, index) => index != bestRide.id)


        console.log("rides", rides)
        console.log("cars", cars)
    }

    return {
        cars: cars,
        rides: rides
    }
}