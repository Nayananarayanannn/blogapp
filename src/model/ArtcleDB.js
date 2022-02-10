const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Nayana:Nayana95@ictaktrial.nyh4v.mongodb.net/my-blog?retryWrites=true&w=majority',{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err));//connect to mongodb db
 const Schema= mongoose.Schema;//initialise Schema

//  setting up particular schema
 var articleSchema= new Schema({
     name:String,
     title:String,
     content:Array
 });

// create collection
 var ArticleContent=mongoose.model('articlecontents',articleSchema);
//export schema
 module.exports=ArticleContent;