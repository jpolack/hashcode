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
            id: 0
        })
    })
})

describe("extendRideData", () => {
    it("should extend the ride data", () => {
        expect(
            turn.extendRideData([{
                start: {
                    x: 0,
                    y: 0
                },
                finish: {
                    x: 1,
                    y: 1
                },
                startAt: 0,
                finishAt: 3
            }], {
                    x: 0,
                    y: 0
                }, 0)
        ).toEqual([{
            start: {
                x: 0,
                y: 0
            },
            finish: {
                x: 1,
                y: 1
            },
            turnsLeft: 1,
            achievable: true,
            achievableWithBonus: true,
            startAt: 0,
            finishAt: 3
        }])

        expect(
            turn.extendRideData([{
                start: {
                    x: 0,
                    y: 0
                },
                finish: {
                    x: 1,
                    y: 1
                },
                startAt: 0,
                finishAt: 2
            }], {
                    x: 0,
                    y: 0
                }, 0)
        ).toEqual([{
            start: {
                x: 0,
                y: 0
            },
            finish: {
                x: 1,
                y: 1
            },
            turnsLeft: 0,
            achievable: false,
            achievableWithBonus: false,
            startAt: 0,
            finishAt: 2
        }])
    })
})

describe("findBestRide", () => {
    it("should find the best ride", () => {
        expect(
            turn.findBestRide([{
                start: {
                    x: 0,
                    y: 0
                },
                finish: {
                    x: 1,
                    y: 1
                },
                turnsLeft: 2,
                achievable: true,
                achievableWithBonus: true,
                startAt: 0,
                finishAt: 4
            }, {
                start: {
                    x: 0,
                    y: 0
                },
                finish: {
                    x: 1,
                    y: 1
                },
                turnsLeft: 1,
                achievable: true,
                achievableWithBonus: true,
                startAt: 0,
                finishAt: 3
            }], {
                    x: 0,
                    y: 0
                }, 0, 0)
        ).toBe(1)

    })
})