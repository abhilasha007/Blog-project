//jshint esversion:6
//import
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hi if you're seeing this, thankyou for taking a look at my work :) I'm Abhilasha and I'm 2nd year student in Netaji Subhas University of Technology. Apart from coding, tech, web-development, I also enjoy creating and learning music and watching movies and tv shows. ";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//middle ware
const app = express();
app.set('view engine', 'ejs'); //for ejs
app.use(bodyParser.urlencoded({extended: true})); //for body parser
app.use(express.static("public")); //makes render search in views folder

//model config
const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);


// DB config
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

//api routes
app.get("/", function(req, res){
  Post.find({}, function(err, post){
    res.render("home", {homeContent: homeStartingContent, posts: post});
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutCont : aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactCont: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
   if (!err){
     res.redirect("/");
   }
 });
});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;
  Post.findOne({_id:requestedPostId}, function(err, post){
      res.render("post", {curr_title:post.title , curr_content:post.content});
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
