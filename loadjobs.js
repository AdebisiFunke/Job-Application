/*
* Aim: This script is writen to  list available jobs from https://dev.spidasoftware.com/apply/jobs and send application data to https://dev.spidasoftware.com/apply/applications.
* This objective is achieved with the use of two functions
* (1) getJobData function - retreive data from jobs.json file on server to list availabe jobs 
* (2) sendData function - sends application data as JSON payload to the server and store the data on applications.json file 
*/

var job_url = "https://dev.spidasoftware.com/apply/jobs";

//when page load excecute getJobData function
window.onload=function(){getJobData();};

//getJobData function will retrieve data from jason file on server and display it on listjobs.html page
function getJobData() {

  //Declare variables that stores values 
  var store_job="";
  var JobRequirements="";
  var apply = "Click Apply";

  //Create xmlhttp object that will be used to retreive data
  var xmlhttp = new XMLHttpRequest();

  //check for state of request
  xmlhttp.onreadystatechange = function() {


    //check request status 
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var jobs = JSON.parse(xmlhttp.responseText);
     

//create required variables to store values, iterate through requirements and add value of each array elements to variables
for (var i = 0; i < jobs.length; i++)
{
    var JobID =jobs[i]._id;
    var JobPos = jobs[i].position;
    var JobDes = jobs[i].description;
    //var JobReq = JSON.stringify(jobs[i].requirements);
  
    //declare variable Req_lenght to store length of requirements array 
    var Req_lenght= jobs[i].requirements.length;
     
     for (var j=0; j< Req_lenght; j++){
    
       var store_requirements = jobs[i].requirements[j];
       if (j==Req_lenght-1){
        JobRequirements += store_requirements;
       }
       else
       JobRequirements += store_requirements + ",";
     }
 
  
    //create a container to store data 
     store_job+="<div class='border p-5 bg-light'><p>" + "Job ID: " + JobID +"</p><p>"+
     "Job Position: " + JobPos +"</p><p>"+  "Job Description: "+ JobDes +"</p><p>"+"Job Requirements: " + JobRequirements
     +"</p><p>"+"<button class='btn btn-info' onclick='sendData()'>" + apply + "</button></p></div>";
}
    //Assign the server response to HTML element with id Job, store data in store_job variable
    document.getElementById("Job").innerHTML = store_job;
    }
   

  };
  
//initialize HTTP request method GET,  make request to job_url to retreive the JSON file data
//and make request asynchronous
  xmlhttp.open("GET", job_url , true);

  //send data
  xmlhttp.send();

}


//function applyfor job will send json payload and store data into applications.json file on server
function sendData() {
 var application_url = "https://dev.spidasoftware.com/apply/applications";
 


   //create json payload that will be sent to api
   var application= {
    name:"Funke Adebisi",
    jobid:"5f3aea08ead4fc0001be475e",
   justification: "I have the skills and the experience required for the job position and I will be a great addition to your organization",
   code:["https://sourceforge.net/projects/sampleprojectpro/", "https://github.com/AdebisiFunke/Job-Application", "https://adebisifunke.github.io/Job-Application/"],
  additionalLinks: "https://adebisifunke.github.io/Job-Application/listjobs.html"
  }

   //create xhr object 
var xhr = new XMLHttpRequest();

//initialize HTTP request method  POST 
 xhr.open("POST", application_url, true);

 //set request header 
xhr.setRequestHeader("Content-Type", "application/json");

//create a state change call back
xhr.onreadystatechange = function () {

  //check request status 
   if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("Application successfully sent");
   }else
      console.log("Unable to send application");
       
   
};

//convert json data to string
var data = JSON.stringify(application);

//print data to console
console.log(data);

//send data
xhr.send(data);
}  
  
