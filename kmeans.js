const kMeans = require("ml-kmeans")

exports.clusterRideStarts = (rides, cb)=>{
    const vectors = rides.map((r)=>[r.start.x, r.start.y]) 
    const means = kMeans(vectors, 2)
    const len = Math.min(rides.length, 11)

    var bestCluster = {}
    var errorOfBestCluster = Number.MAX_VALUE
    
    for (var i = 1; i < len; i++) {
        cc = createCluster(vectors, i)
        if (cc.error < errorOfBestCluster) { 
            bestCluster = {
                cluster: cc.cluster,
                centroids: cc.centroids
            }
        }
    }   

    return bestCluster
}

function createCluster(vectors, clusterSize) {
    var index = 0
    const means = kMeans(vectors, clusterSize)
    errorvariance = 0

    resultClusters = means.clusters.reduce((clusters, clusterIndex) => {
        if (!clusters[clusterIndex]){
            clusters[clusterIndex] = []
        } 
        clusters[clusterIndex].push({
            pos: {
                x: vectors[index][0],
                y: vectors[index][1]
            },
            id: index
        })

        index++
        return clusters
    }, [])

    resultCentroids = []
    for (var i = 0; i < means.centroids.length; i++) {
        resultCentroids.push({
            x: means.centroids[0].centroid[0],
            y: means.centroids[0].centroid[1]
        })

        errorvariance += means.centroids.error
    }

    return {
        cluster: resultClusters,
        centroids: resultCentroids,
        error: (errorvariance / means.centroids.length)
    }
}
