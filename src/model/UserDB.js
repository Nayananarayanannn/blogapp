const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Nayana:Nayana95@ictaktrial.nyh4v.mongodb.net/my-blog?retryWrites=true&w=majority',{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
 const Schema= mongoose.Schema;

 var User= new Schema({
     
     username:{ type: String, required: true },
     email:{ type: String, required: true, unique: true },
     password:{ type: String, required: true }
 });

 var userModel=mongoose.model('users',User);

 module.exports= userModel;