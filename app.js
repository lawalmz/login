const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const { emit } = require("nodemon");
const path = require('path');

const apiRoute = require("./routes/api");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); 


app.use(express.static("public"));
app.use("/api", apiRoute);
mongoose.connect("mongodb://localhost:27017/CIU",{useNewUrlParser:true});


const People = {
    email:String,
    password:String
}
const Student = mongoose.model("student",People);

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "login.html")); 
});

app.get("/register", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
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

app.post("/action_page.php", function(req, res) {
    const email = req.body.uname;
    const password = req.body.psw;
  
    console.log(email, password);
  
    let loginFound = false;
  
    Student.find().then((students) => {
      for (let i = 0; i < students.length; i++) {
        console.log(students[i].email);
        if (email == students[i].email && password == students[i].password) {
          console.log("information found");
          loginFound = true;
          break;
        }
      }
  
      if (loginFound) {
        localStorage("auth",true);
        res.redirect("/");
        
      } else {
        console.log("information don't match")
        res.redirect("/login.html");
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).send("Error connecting to database");
    }).finally(() => {
      
    });
});
  
  





app.listen(3000, function(){
    console.log("Server started on port 3000.");
  });