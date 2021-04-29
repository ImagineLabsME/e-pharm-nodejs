const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URL;
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

mongoose.connect(mongoURI, options);

mongoose.connection.on('connected', () => {
    console.log('DB Connected Successfully');
});
mongoose.connection.on('error', (err) => {
    console.log('handle mongo errored connections: ' + err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('App terminated, closing mongo connections');
        process.exit(0);
    });
});
