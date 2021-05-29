window.onload = employeeData;

function employeeData() {
  "use strict";
  //fetching api data
  fetch("http://sandbox.bittsdevelopment.com/code1/fetchemployees.php")
    .then(function (response) {
      //api call success
      console.log("success!", response);
    })
    .catch(function (error) {
      //catching errors
      console.log("error!", error);
    });
}
