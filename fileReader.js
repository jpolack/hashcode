const fs = require("fs");
const path = require("path")

module.exports = function (fileName) {
    const file = fs.readFileSync(path.join("data", fileName), { encoding: "UTF-8" });

    const lines = file
        .split("\n")
        .map(line => line.split(" "));


    const meta = {
        rows: lines.slice(0, 1)[0][0] * 1,
        cols: lines.slice(0, 1)[0][1] * 1,
        cars: lines.slice(0, 1)[0][2] * 1,
        rides: lines.slice(0, 1)[0][3] * 1,
        bonus: lines.slice(0, 1)[0][4] * 1,
        turns: lines.slice(0, 1)[0][5] * 1,
    }

    const rides = lines.slice(1, 1 + meta.rides)
        .map(ride => ({
            start: {
                x: ride[0] * 1,
                y: ride[1] * 1
            },
            finish: {
                x: ride[2] * 1,
                y: ride[3] * 1
            },
            startAt: ride[4] * 1,
            finishAt: ride[5] * 1,
        }))
    return {
        meta: meta,
        rides: rides,
    }
}