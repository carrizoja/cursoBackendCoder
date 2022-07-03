const { NumberTools } = require("../utils/tools");

const countGenerateRandomNumbers = (cantRandomNumbers) => {
    let nums = {};

    for (let i = 0; i < cantRandomNumbers; i++) {
        let randomNumber = NumberTools.getRandom();
        nums[randomNumber] = nums.hasOwnProperty(randomNumber) ? nums[randomNumber] + 1 : 1;
    }

    return nums;
}

module.exports = { countGenerateRandomNumbers }