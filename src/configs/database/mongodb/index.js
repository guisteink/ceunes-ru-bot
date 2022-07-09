const mongoose = require("mongoose");

async function connect()
{
    try {
        await mongoose.connect('MONGO_URI',
            { useNewUrlParser: true },
        )
    } catch (err) {
        console.error("Error connecting to mongodb", err);
    }
}

module.exports = { connect };
