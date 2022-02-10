const express= require ("express")
const ArticleInfo = require("./model/BlogDB");
const ArticleContent= require("./model/ArtcleDB")
const cors = require("cors");
require("dotenv").config();
const app = express();
// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "../build")));
// Step 2:



app.use(express.json());

// Setting up CORS
app.use(cors());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-with,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});


// get particular article content from db
app.get("/api/article/:name", (req, res) => {
    const articleName = req.params.name;
  
    ArticleContent.findOne({ name: articleName }).then(function (article) {
      res.json(article);
    });
  });

  // get articles from db
  app.get("/api/articles", (req, res) => {
    const articleName = req.params.name;
  
    ArticleContent.find().then(function (article) {
      res.json(article);
    });
  });


// get particular article list from db
app.get("/api/articles/:name", (req, res) => {
  const articleName = req.params.name;

  ArticleInfo.findOne({ name: articleName }).then(function (article) {
    res.json(article);
  });
});

// Upvote particular article
app.post("/api/articles/:name/upvotes", (req, res) => {
  const articleName = req.params.name;
  const filter = { name: articleName };
  const update = { $inc: { upvotes: 1 } };
  ArticleInfo.findOneAndUpdate(filter, update, { new: true }).then(function (
    article
  ) {
    res.json(article);
  });
});

// comment particular article
app.post("/api/articles/:name/comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  const filter = { name: articleName };
  const update = { $push: { comments: { username, text } } };

  ArticleInfo.findOneAndUpdate(filter, update, { new: true }).then(function (
    article
  ) {
    res.json(article.comments);
  });
});

// add new article to db
app.post("/api/add-article",(req,res)=>{
  var item={
    title:req.body.title,
    name:req.body.name,
    content:req.body.content
  }
  var itemInfo={
    name:req.body.name,
    upvotes:0,
    comments:""

  }
  console.log(itemInfo);
  const article= new ArticleContent(item);
  article.save();
  const articleInfo=new ArticleInfo(itemInfo);
  articleInfo.save();
  res.send("ok");
})

// update article from form
app.post("/api/:name/update",(req,res)=>{
  const articleName = req.params.name;
  const title=req.body.title;
  const name=req.body.name;
  const content=req.body.content;
  const filter={name:articleName};

  const update={$set:{title:title,name:name,content:content}};

  ArticleContent.findOneAndUpdate(filter, update, { new: true })
  .then(
    ArticleInfo.findOneAndUpdate(filter,{$set:{title:title,name:name}},{new:true})
  .then(function(articles){
    res.json(articles)
  }
  )
  )
  
})


// delete article from db
app.post('/api/:name/delete', function (req, res) {
  const articleName = req.params.name;

  ArticleContent.findOneAndDelete({ name: articleName })
      .then(function () {
        ArticleInfo.findOneAndDelete({ name: articleName })
        .then(function () {
  
            console.log("deleted")
            res.send("deleted")
  
        })  

      })  
  
})
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../build", "index.html"));
  
});
console.log(__dirname);
// specify port
app.listen(process.env.PORT || 8000, () => {
  console.log("listening 8000");
});
