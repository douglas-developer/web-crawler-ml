const config = require('config');
const mongoose = require("mongoose");

const setupDatabase = async () => {
    try {
        let { url } = config.get('database');
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        mongoose.connection.on("connected", () => {
            console.info(`Database connected: ${url}`);
        });

        mongoose.set('debug', true);
        return mongoose;
    } catch (error) {
        console.error(`Unable to connect to the database:`, error);
        throw error;
    }
};

module.exports = {
    setupDatabase
};
