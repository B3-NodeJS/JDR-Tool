const rollDice = (args, err) => {
    // Regex that validates if the command argument has the right syntax
    const regex = new RegExp('^\\d+\d\\d+$', 'i');
    let results = [];

    for (const arg of args) {
        if (!regex.test(arg))
            err;

        // Random dice numbers according to arguments passed
        for (let i = 0; i < arg.split('d')[0]; i++) {
            results.push(Math.floor(Math.random() * arg.split('d')[1]) + 1);
        }
    }

    return results;
};

module.exports = rollDice;