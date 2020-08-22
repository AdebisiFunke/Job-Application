/*
  * Aim: This script is writen to  list available jobs from https://dev.spidasoftware.com/apply/jobs and send application data to https://dev.spidasoftware.com/apply/applications.
  * This objective is achieved with the use of two functions
  * (1) getJobData function - retreive data from jobs.json file on server to list availabe jobs 
  * (2) sendData function - sends application data as JSON payload to the server and store the data on applications.json file 
  * Author: Funke Adebisi
  */

//Create xmlhttp object that will be used to retreive data
var xmlhttp = new XMLHttpRequest();

 //when page load excecute getJobData function
 window.onload = function() {
   getJobData();
 };
 
 //getJobData function will retrieve data from jason file on server and display it on listjobs.html page
 function getJobData() {
  var job_url,apply;
  //Declare variable that stores url location
  job_url = "https://dev.spidasoftware.com/apply/jobs";

   //Declare variables that stores values 
   apply = "Click Apply";
 
   //check for state of request
   xmlhttp.onreadystatechange = function() {
   var jobs, store_job, JobID,JobPos,JobDes,Jobs,Req_lenght,JobRequirements, store_requirements;
    store_job = "";
 
     //check request status 
     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
       jobs = JSON.parse(xmlhttp.responseText);
 
       //create required variables to store values, iterate through requirements and add value of each array elements to variables
       for (var i = 0; i < jobs.length; i++) {
         JobID = jobs[i]._id;
         JobPos = jobs[i].position;
         JobDes = jobs[i].description;
 
         //declare variable Req_lenght to store length of requirements array 
         Req_lenght = jobs[i].requirements.length;
         JobRequirements = "";
         for (var j = 0; j < Req_lenght; j++) {
 
           store_requirements = jobs[i].requirements[j];
           if (j == Req_lenght - 1) {
             JobRequirements += store_requirements;
           } else
             JobRequirements += store_requirements + ",";
 
         }
         //create a container to store data 
         store_job += "<div class='border p-5 bg-light'><p>" + "Job ID: " + JobID + "</p><p>" +
           "Job Position: " + JobPos + "</p><p>" + "Job Description: " + JobDes + "</p><p>" + "Job Requirements: " + JobRequirements +
           "</p><p>" + "<button class='btn btn-info' onclick='sendData()'>" + apply + "</button></p></div>";
       }
       //Assign the server response to HTML element with id Job, store data in store_job variable
       document.getElementById("Job").innerHTML = store_job;
     }
   };
 
   //initialize HTTP request method GET,  make request to job_url to retreive the JSON file data
   //and make request asynchronous
   xmlhttp.open("GET", job_url, true);
 
   //send data
   xmlhttp.send();
 
 }
 
 
 //function applyfor job will send json payload and store data into applications.json file on server
 function sendData() {
  var application_url, data;
  application_url = "https://dev.spidasoftware.com/apply/applications";
 
   //create json payload that will be sent to api
   application = {
     name: "Funke Adebisi",
     jobId: "5f3aea08ead4fc0001be475e",
     justification: "I have the skills and the experience required for the job position and I will be a great addition to your organization",
     code: "https://github.com/AdebisiFunke/Job-Application",
     additionalLinks: ["https://sourceforge.net/projects/sampleprojectpro/", "https://adebisifunke.github.io/Job-Application/listjobs.html", "https://adebisifunke.github.io/precious-kids-preschool/", "https://adebisifunke.github.io/FORMPRO/"]
   }
   //initialize HTTP request method POST 
    xmlhttp.open("POST", application_url, true);
 
   //set request header 
   xmlhttp.setRequestHeader("Content-Type", "application/json");
 
   //create a state change call back
   xmlhttp.onreadystatechange = function() {
 
     //check request status 
     if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
       console.log("Application successfully sent");
     } else
       console.log("Unable to send application");
 
   };
 
   //convert json data to string and store in it in data variable
   data = JSON.stringify(application);
 
   //send data
   xmlhttp.send(data);
 }
