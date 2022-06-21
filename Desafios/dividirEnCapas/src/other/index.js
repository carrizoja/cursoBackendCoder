/**
 * It takes a number as an argument, and returns an array of random numbers
 * @param repetitions - The number of times the random number generator will run.
 * @returns The process is returning an array of random numbers.
 */
const calculate = (repetitions) => {
    let total = [];
    for (let i = 0; i < repetitions; i++) {
        total[i] = Math.random() * (1001 - 1) + 1;
    }
    return total;
};

process.on("message", (message) => {
    console.log(message);
    if (typeof message == "number") {
        let total = calculate(message);
        process.send(total);
    } else {
        console.log("The process could not start.");
    }
});