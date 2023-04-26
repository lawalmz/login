const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/CIU",{useNewUrlParser:true});


const People = {
    email:String,
    password:String
}
const Student = mongoose.model("student",People);

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
    
});

app.get("/login.html", function(req, res){
    res.sendFile(__dirname+"/login.html");
});


  


app.post("/", function(req, res) {
    email = req.body.email;
    password = req.body.psw;
    const passwordConfirm = req.body['psw-repeat'];
    console.log(email, password);
  
    if (password == passwordConfirm) {
      const person = new Student({ email: email, password: password });
      person.save();
      console.log("Inserted");
      res.redirect("/login.html");
    } else {
      console.log("password did not match");
      res.redirect("/");
    }
});
  





app.listen(3000, function(){
    console.log("Server started on port 3000.");
  });