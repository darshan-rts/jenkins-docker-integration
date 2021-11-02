//jshint esversion:6
const mongoose=require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash")

mongoose.connect("mongodb+srv://blogDB:hasnain@cluster0.jicsi.mongodb.net/blogDB?retryWrites=true&w=majority");
const postSchema =new mongoose.Schema({
  title: String,

  content: String
});

const Post = mongoose.model("Post", postSchema);



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hi, I’m Hasnain Shaikh. cI started learning to code in my Second year.Over time, I have gained a wealth of experience designing and developing web applications.Posses an expertise knowledge in web application development using a broad range of programming technologies such as Java, Spring Web, Spring Boot, JavaScript, HTML, CSS, Rect/Angular. Quite a good experience with working on ORM tools like Hibernate, Mongodb, SQL/PLSQL and Oracle. Familiarity with Gradle/Maven. Pursuing knowledge in Micro Services Architecture and RESTFUL service. So far accomplished the exposure and consumption of services.";
const contactContent = " I am a Java and Web Developer.I ❤️ love coffee and brew my own beer.";

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postsarray=[];

app.get("/",function(req,res){

  Post.find({},function(err,posts){
    



    res.render("home",{ startingdata:homeStartingContent,postdatas:posts});
  })
})

app.get("/about",function(req,res){


  res.render("about",{ aboutdata:aboutContent });
})

app.get("/contact",function(req,res){


  res.render("contact",{ contactdata:contactContent});
})

app.get("/compose",function(req,res){


  res.render("compose");
})

app.post("/",function(req,res){

  
  
  const post = new Post ({

    title: req.body.title,
 
    content: req.body.post
 
  });
  post.save();
  res.redirect("/")
})



app.get("/post/:postrank",function(req,res){
 
  
  var lowerrequesttitle=req.params.postrank
    console.log("request in lower:"+lowerrequesttitle);

 
    Post.find({},function(err,posts){
  
        posts.forEach(function(post){
  
     var lowerstoredtitle=post.title;


   if(lowerrequesttitle===lowerstoredtitle)
   {
     console.log("match found");
    bdata={
      title:post.title,
      data:post.content
    }
     res.render("post",{blgdata:bdata})
   }
   else{
     console.log("match not found");
   }
   console.log("end test");
  })
 })
})

let port =process.env.PORT;
if(port ==null || port ==""){
  port=3000;
}

app.listen(port, function() {
  console.log("Server has started on port 3000");
});
