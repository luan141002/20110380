//MONGODB CONNECTIONS
const dotenv = require('dotenv');
dotenv.config();
function DBconnection(mongoose) {
    const connect = async () => {
        try {
            await mongoose.connect(process.env.MONGO);
            console.log('connect to mongo DB');
        } catch (err) {
            throw err;
        }
    };
    connect();
    //checking connection
    mongoose.connection.on('disconnected', () => {
        console.log('mongoDB disconnected');
    });
    mongoose.connection.on('connected', () => {
        console.log('mongoDB connected');
    });
}
module.exports = DBconnection;
