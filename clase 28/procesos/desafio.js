process.stdout.write("Hi there!\n");
process.stdout.write("Insert number array: ");

process.stdin.on('data', data => {
    const enteredData = data.toString().trim();
    if (enteredData.length) {
        const array = JSON.parse(enteredData);
        const sum = array.reduce((acc, i) => acc + parseInt(i), 0);
        console.log(sum)
        if (isNaN(sum)) {
            console.log('invalid data')
            console.log({
                description: "invalid data",
                numbers: array,
                types: array.map(i => typeof i)

            })
        } else {
            console.log('valid data')
            console.log({
                numbers: array,
                average: sum / array.length,
                max: Math.max(...array),
                min: Math.min(...array),
                execName: process.execPath,
                pid: process.pid,
            })
            process.exit();
        }
    } else {
        console.log("Invalid value")
        console.log({
            description: "null value",
        })
    }
})