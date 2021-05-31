window.onload = employeeData;

var url = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";

function employeeData() {
  "use strict";
  //fetching api data
  fetch(url)
    .then((response) => {
      //error handling before converting data into json
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    //doing stuff with the data
    .then((data) => {
      //transforming json data into array
      const objectArray = Object.entries(data);

      const html = objectArray
        .map((employee) => {
          //getting id and then inserting id into image url
          let id = employee[1].employeeid;
          let image = `http://sandbox.bittsdevelopment.com/code1/employeepics/${id}.jpg`;

          console.log(image);
          return `
        <div class="teamBox">
          <p><img src="${image}" alt="${employee[1].employeefname}" /></p>
          <h2>${employee[1].employeefname}</h2>
          <p id="memberBio">${employee[1].employeebio}</p>
        
        `;
        })
        .join("");
      console.log(html);
      document
        .querySelector("#container")
        .insertAdjacentHTML("afterbegin", html);
    })
    .catch(function (error) {
      //catching errors
      console.log("error!", error);
    });
}
