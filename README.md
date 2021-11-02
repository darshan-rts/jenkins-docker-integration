# Nodejs-blogproject

#Chained Route Handler->https://expressjs.com/en/guide/routing.html
#Route parameters ->Route path: /users/:userId/
Request URL: http://localhost:3000/users/34

#download the project 
#open the project foldder in Visual Code
#Goto terminal ->inside project folder ->run "npm init"
#install the following dependencies:body-parser,ejs,express,lodash,mongoose
#after running npm init and installing the dependencies like  body-parser,ejs,express,lodash,mongoose automatically node module folder will be generated 
#the project uses the database hosted on mongodb Altas aws (cloud) https://account.mongodb.com/account/login login with google  hasnains312@gmail.com 
#and the project website is hosted on heroku :on this link https://protected-anchorage-33774.herokuapp.com/

#used mongo as database and mongoose(Mongoose is a JavaScript framework that is commonly used in a Node. js application with a MongoDB database)
#creae a database with name blogDB and collection  with name posts (purals)which has following  fields as title and content
 both as String .
#to insert read delete update document using mongoose refer  https://mongoosejs.com/ ->read the docs https://mongoosejs.com/docs/guide.html under Model section we getall the methods related to mongoose for performing CRUD operation 

****************************************************************
#to insert a single document into the database

syntex:
const <constantName> = new <ModelName> ({
<fieldName>:<fieldData>
....
});
<constantName>.save();
 
 example:
const post = new Post ({
 title: req.body.title,
 content: req.body.post
 });
post.save();


##to read all thedocuments  from  the database
#if we dont specify {} or dont give any value inside {} then it will display all the documents->Article.find(function(err,foundArticles){} or 
Article.find({},function(err,posts){ } 
#if we specify the condition  to find method Post.find({name:hasnain}){} ->then it returns specific matching document
example 1:
Post.find({},function(err,posts){
     res.render("home",{ startingdata:homeStartingContent,postdatas:posts});
  })
  
  exampe2:
app.get("/articles",function(re,res){
    Article.find(function(err,foundArticles){
        if(!err){
        console.log(foundArticles);
        foundArticles.forEach(function(index){
          console.log(index.title);  
           // res.write('<h1>title</h1>'+index.title);
          //  res.write('<h3>content</h3>'+index.content);
        })
        //res.send(); 
        //or
        res.send(foundArticles);
     }else
    res.send(err);
    })
******************************************************
##to delete all the documents from the database
syntex 1:
<ModelName>.deleteMany(
{conditions},function(err){

}
);
syntex 2:
<ModelName>.deleteMany(
,function(err){

}
);

##to delete specific document
Articles.deleteOne({ name: 'Eddard Stark' }, function (err) {});

#to update a record using PUT

app.put(route,function(req,res){
//if we use PUT to update a record we have to pass all the fields if we do not pass all the fields then it will remove that field form the database
For example if Article has two field title and content then we have to pass value for both fields else the field for which we dont provide value will be deleted from database
#syntax:
Article.update(
{conditions},
{updates},
{overwrite:true},
function(err){
    });

#example:
Article.update(
    {title:req.params.articleTitle},
    {title:req.body.title,content:req.body.content},
    {overwrite:true},
    function(err){
        if(!err){
            res.send("successfully updated record");
        }

    });

});



#to update a record using PATCH
//IF WE WANT TO UPDATE SPECIFIC FIELD IN SPECIFIC DOCUMENT WE USE PATCH

app.patch(route,function(req,res){

#syntax:
Article.update(
{conditions},
{$set: updates},
function(err){
    });

set field tells mongodb to  only update value for the specific fields provide:https://docs.mongodb.com/manual/reference/operator/update/set/
{ $set: { <field1>: <value1>, ... } }
 console.log(req.body);
#example:
Article.update(
    {title:req.params.articleTitle},
    {$set: req.body},
     function(err){
        if(!err){
            res.send("successfully updated record");
        }

    });

});



*******************************************
#Chained Route Handler ->https://expressjs.com/en/guide/routing.html
1)without chained route handler

app.get("/articles",function(re,res){})
app.post("/articles",function(req,res){})
app.delete("/articles",function(req,res){})

2)with Chained Route Handler
app.route('/articles')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
