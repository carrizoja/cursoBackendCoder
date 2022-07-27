const util = require("util");

class InspectTools {
    static log(obj) {
        console.log(util.inspect(obj, false, 12, true));
    }

    static normalizeInfo(toNormalizeData, normalizeData) {
        InspectTools.log(normalizeData);
        console.log("Normal Length ----->", JSON.stringify(toNormalizeData).length);
        console.log("Normalize Length ----->", JSON.stringify(normalizeData).length);
    }

    static denormalizeInfo(deNormalizeData) {
        console.log("Denormalize Length ----->", JSON.stringify(deNormalizeData).length);
        InspectTools.log(deNormalizeData);
    }
}

module.exports = InspectTools;