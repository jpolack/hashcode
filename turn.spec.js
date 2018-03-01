const turn = require("./turn")

describe("findClosestCluster", () => {
    it("should find the clostest cluster", () => {
        expect(turn.findClosestCluster({
            x: 0,
            y: 0
        }, [{
            x: 1,
            y: 1
        }, {
            x: 2,
            y: 2
        }])).toEqual({
            dist: 2,
            index: 0
        })
    })
})