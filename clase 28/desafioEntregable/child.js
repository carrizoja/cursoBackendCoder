const calculate = () => {
    let sum = 0;
    for (let i = 0; i < 6e9; i++) {
        sum += i;

    }
    return sum
}

process.on("message", parentMsg => {
    if (parentMsg === "inizialize") {
        const sum = calculate();
        process.send(sum);
    }
})