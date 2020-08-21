/*
The getjobData function will list available job from https://dev.spidasoftware.com/apply/jobs.
The apply for job function will send application data to https://dev.spidasoftware.com/apply/applications
The sendemail function will send email after applying for job position
*/
var DATA_URL = "https://dev.spidasoftware.com/apply/jobs";
window.onload=function(){
  getJobData(); 
};


function getJobData() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var jobs = JSON.parse(xmlhttp.responseText);

var x="";
var apply = "Click Apply "

for (var i = 0; i < jobs.length; i++)
{
    var JobID =JSON.stringify(jobs[i]._id);
    var JobPos = JSON.stringify(jobs[i].position);
    var JobDes = JSON.stringify(jobs[i].description);
    var JobReq = JSON.stringify(jobs[i].requirements);

    var ap= "apply";
    //create a container 
     x+="<br>" + "Job ID: " + JobID +"<br>"+
         "Job Position: " + JobPos +"<br>"+  "Job Description: "+ JobDes + "<br>"+"Job Requirements: " + JobReq+
         "<br>"+"<p id='getjobid' onclick='applyforjob()'>" + apply + "</p>";
}

document.getElementById("Job").innerHTML = x;
    }
  };
  
  xmlhttp.open("GET", DATA_URL , true);
  xmlhttp.send();

}

function applyforjob() {
 var url = "https://dev.spidasoftware.com/apply/applications";
   //create json data
   var application= {
    "Name":"Funke Adebisi",
    "id":"5f3aea08ead4fc0001be475e",
   "Justification": "I have the skills and the experience required for the job position and I will be a great addition to your organization",
   "code":"https://sourceforge.net/projects/sampleprojectpro/, https://github.com/AdebisiFunke/Job-Application, https://adebisifunke.github.io/Job-Application/"
   }

   //create xhr object 
var xhr = new XMLHttpRequest();

//open a connection 
 xhr.open("POST", url, true);

 //set request header 
xhr.setRequestHeader("Content-Type", "application/json");

//create a state change call back
xhr.onreadystatechange = function () {

  //check ststus of application send
   if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("Application successfully sent");
   }else
        console.log("Unsble to send application");
       
   
};

//convert json data to string
var data = JSON.stringify(application);
//print data to console
console.log(data);

//send data
xhr.send(data);
}  
  


  //send email using NodeMailer Module 
  //install nodemailer using - npm install nodemailer
  function sendemail() {
    var nodemailer = require("nodemailer");
  
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "myemail@gmail.com",
      pass: "password"
    }
  });
  

  var mailOptions = {
    from: "myemail@gmail.com",
    to: "job@spidasoftware.com",
    subject: "JobID",
    text: "My JobID is 5f3aea08ead4fc0001be475e"
  };
  
  transporter.sendMail(mailOptions, function(errormsg, info){
    if (errormsg) {
      console.log(errormsg);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
    }
    
