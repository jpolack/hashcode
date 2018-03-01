const util = require("./util")

exports.findClosestCluster = function (pos, centroids) {
    return centroids.reduce((clostest, centroid, index) => {
        const dist = util.dist(pos, centroid)
        if (clostest.dist > dist) {
            return {
                dist: dist,
                index: index
            }
        }

        return clostest
    }, {
            index: 0,
            dist: Infinity
        })
}

exports.do = function (meta, turn, rides, cluster, cars) {
    for (carId in cars.free) {
        const car = cars[carId]
        findClosestCluster(car.pos, cluster.centroids)
    }
}