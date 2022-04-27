process.stdout.write("Hi there!\n");
process.stdout.write("What is your name? ");

process.stdin.on('data', data => {
    console.log(`mucho gusto ${data.toString().trim()}`);
})