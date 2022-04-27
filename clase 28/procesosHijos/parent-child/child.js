process.on("message", (parentMsg) => {
    console.log('parent message', parentMsg);
    if (parentMsg === 'inizialize') {
        setTimeout(() => {
            process.send('child message');
        })

    }
    if (parentMsg === 'exit') {
        process.exit();
    }

});