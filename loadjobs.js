/*
  * Aim: This script is written to  list available jobs jobs.json and send application data to applications.json
  * This objective is achieved with the use of two functions
  * (1) getJobData function - retreive data from jobs.json file on server to list availabe jobs 
  * (2) sendData function - sends application data as JSON payload to the server and store the data in applications.json file 
  * Written by: Funke Adebisi
  */

//Create xmlhttp object
var xmlhttp = new XMLHttpRequest();

 //when page load excecute getJobData function
 window.onload = function() {
   getJobData();
 };
 
 /*
 * getJobData function will retrieve data from JSON file on server and display it on listjobs.html page
 */
 function getJobData() {
  //declare variables
  var job_url,apply;
  
  //declare variable that stores url
  job_url = "jobs.json";

   //declare variables that stores values 
   apply = "Click Apply";
 
   //check for state of request
   xmlhttp.onreadystatechange = function() {
   //declare variables 
   var jobs, store_job, JobID,JobPos,JobDes,Jobs,Req_lenght,JobRequirements, store_requirements;
    store_job = "";
 
     //check request status 
     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
       jobs = JSON.parse(xmlhttp.responseText);
 
       //iterate through and add value of each array element to variables
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
       //assign the server response to HTML element with id Job then store data in store_job variable
       document.getElementById("Job").innerHTML = store_job;
     }
   };
 
   //initialize HTTP request method GET,  make request to job_url to retreive the JSON file data
   //and make request asynchronous
   xmlhttp.open("GET", job_url, true);
 
   //send data
   xmlhttp.send();
 
 }
 
 
 /*
 * function sendData() will send JSON payload and store data into applications.json 
 */
 function sendData() {
  //declare variables
  var application_url, data;
  
  //application_url variable stores url value
  application_url = "applications.json";
 
   //create JSON payload
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
 
   //convert JSON data to string store the value in data variable
   data = JSON.stringify(application);
 
   //send data
   xmlhttp.send(data);
 }
