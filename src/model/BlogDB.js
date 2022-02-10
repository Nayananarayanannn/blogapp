const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Nayana:Nayana95@ictaktrial.nyh4v.mongodb.net/my-blog?retryWrites=true&w=majority',{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
 const Schema= mongoose.Schema;

 var articleSchema= new Schema({
     name:String,
     username:String,
     upvotes:Number,
     comments:Array
 });

 var ArticleInfo=mongoose.model('articles',articleSchema);

 module.exports=ArticleInfo;