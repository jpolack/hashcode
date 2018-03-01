const kMeans = require("ml-kmeans")

exports.clusterRideStarts = (rides, cb)=>{
    const vectors = rides.map((r)=>[r.start.x, r.start.y])
 
    const means = kMeans(vectors, 2)
    return means.clusters.reduce((clusters, clusterIndex)=>{
        if (!clusters[clusterIndex]){
            clusters[clusterIndex] = []
        } 
        clusters[clusterIndex].push({
            x: vectors[clusterIndex][0],
            y: vectors[clusterIndex][1] 
        })
        return clusters
    }, [])
}
