const fs = require("fs");

module.exports = function (fileName, data) {
    for (var i = 0; i < data.length; i++) {
        var car = data[i]
        var dataLine = String(car.id) + " " + car.rides.join(" ")
        fs.appendFileSync(fileName, dataLine, { encoding: "UTF-8"});
    }
}
