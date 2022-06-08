const express = require('express');
const db = require('./config/db');
const UserSchema = require('./Models.js/UserSchema');
const app = express();
const PORT = 5000;
const userSchema = require('./Models.js/UserSchema');




db();
app.use(express.json());  

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.post('/login',async(req,res)=>{


   
    
    const is_exist = await UserSchema.count({email:req.body.email});
   
    const user = {
        email:req.body.email,
        searchHistory:[]
    }

    if(is_exist === 0){
         await new UserSchema(user).save();
    }
   
    res.sendStatus(200);
   
})

app.post('/saveHistory',async(req,res)=>{
    let email = req.body.email;
    let searchquery = req.body.searchquery;

    await UserSchema.findOneAndUpdate({email:email},
        {
          $addToSet:{
              searchHistory:searchquery
          }
        }
    
    )

    res.sendStatus(200);

})




app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is Successfully Running")
    
    }                
    else 
        console.log("Error occurred, server can't start", error);
    }
);