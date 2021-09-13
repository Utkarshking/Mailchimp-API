const express=require('express');
const https=require('https');
const bodyparser=require('body-parser');
// const request=require('request');
//included express module
const  app = express();
app.use(bodyparser.urlencoded({extended:true}));
//folder have been made static for the files to get accessed in the localhost
app.use(express.static("public"));
app.get("/",function(req,res){
res.sendfile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
const firstname=req.body.fname;
const lastname=req.body.lname;
const email=req.body.email;
const data={
		"members": [
		{
		"email_address":email,
		"status":"subscribed",
		"merge_fields":{
			first_name:firstname,
			last_name:lastname,
		}
	}
		]
	
};
const jsondata=JSON.stringify(data);
const url="https://us1.api.mailchimp.com/3.0/lists/d30a42ee93";
const options={
	method:"POST",
	auth:"Utkarsh2:0a45d7c243af69d9609cbcc134d7ee8f-us1"

}
const request=https.request(url,options,function(response){
	if(response.statusCode===200){
		// res.send("successfully subscribed!");
		res.sendfile(__dirname+"/success.html");
	}
	else{
		// res.send("there was an error in signing up");
		res.sendfile(__dirname+"/failure.html");
	}
	response.on("data",function(data){
		console.log(JSON.parse(data));
	})
	})
	// request.write(jsondata);
	request.end();	
});
app.post("/failure",function(req,res){
	res.redirect("/");
});

app.listen(3000,function(){
console.log("server started running in 3000");	
});
//apikey
// 
//listid
// 