const mongoose = require('mongoose');

// Get rid of the warnings
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect('mongodb+srv://user_test:password_test@b3-nodejs.sbjxa.mongodb.net/jdr-tool', dbOptions, (err) => {
    if (err)
        process.exit(1);

    console.log('Connected!');
});

module.exports = mongoose;