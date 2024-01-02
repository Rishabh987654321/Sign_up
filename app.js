const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const { Server } = require("http");
const app=express();
const Mailchimp = require('mailchimp-api-v3');
const mailchimp = new Mailchimp('98c3f2c0bbfa894f3a698b8f56a97bdf-us21');
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});


// 98c3f2c0bbfa894f3a698b8f56a97bdf-us21 mail chimp api
// 5768c21c10. audience id

app.post("/",function(req){
    const firstName=req.body.fName;
    const lastName=req.body.LName;
    const email=req.body.email;
    console.log(firstName,lastName,email);

    const data={
        members:[
            {
            email_address:email,
            status:"unsubscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
            }
        ]
    };
    var jasonData=JSON.stringify(data);

    const url=" https://us21.api.mailchimp.com/3.0/5768c21c10"
    const options={
        method:"POST",
        auth:"Rishabh:98c3f2c0bbfa894f3a698b8f56a97bdf-us21"
    }

    const request=https.request(url,options,function(response){
        response.on(JSON.parse(data));
    })
    request.write(jasonData);
    request.end();
});