const mongoose = require('mongoose');
const colors = require('colors');

const connectdb = async() =>{
     const MONGO_URI = 'mongodb+srv://shubham:pnFGBMJPsyFcky2g@cluster0.uon8c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
     try {
        const db_connection = await mongoose.connect(MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
           
        });
        console.log(`db connection host is: ${db_connection.connection.host}`.red.bold);
        
     } catch (error) {
         console.log(error);
         process.exit;
     }


}

module.exports = connectdb;



