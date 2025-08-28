const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect('mongodb+srv://sammad1249:Dlsw2zV7YjPS9H2K@cluster0.nx0xr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
            console.log(`mongoDB connected`)
} catch (error) {
 console.error(error)
 process.exit(1)
}

};

module.exports = connectDB;