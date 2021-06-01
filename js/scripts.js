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
    .then(function (data) {
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          //we have the data!
          let employee = data[key];
          //console.log(employee);

          //assigning api data to variables to be able to use them in our functions
          let id = employee["employeeid"];
          let fname = employee["employeefname"];
          let lname = employee["employeelname"];
          let bio = employee["employeebio"];
          let roles = employee["roles"];
          let featured = employee["employeeisfeatured"];

          //console.log(id);

          renderData(id, fname, lname, bio, roles, featured);
        }
      }
    })
    .catch(function (error) {
      //catching errors
      console.log("error!", error);
    });
}

function renderData(
  id,
  fname,
  lname,
  employeeBio,
  employeeRoles,
  employeeFeatured
) {
  //creating all the html elements that will be used
  //box will be the employee card
  let box = document.createElement("div");
  let image = document.createElement("img");
  let name = document.createElement("h2");
  let bio = document.createElement("p");
  let roles = document.createElement("div");
  let crown = document.createElement("span");

  //adding the elements to https://www.w3schools.com/jsref/prop_element_classlist.asp
  box.classList.add("box");
  crown.classList.add("crown");
  roles.classList.add("roles");

  //CROWN ICON
  crown.innerHTML = "&#128081;";

  //getting the image
  image.src = `http://sandbox.bittsdevelopment.com/code1/employeepics/${id}.jpg`;
  image.alt = `${fname} ${lname}`;

  //putting api data into name, bio and pic
  name.innerHTML = `${fname} ${lname}`;
  bio.innerHTML = `${employeeBio}`;
  // console.log(name);

  //if employee is featured then add the crown
  if (employeeFeatured === "1") {
    box.appendChild(crown);
  }

  //fetching role data, and then creating an element for it - then appending the element to classList roles
  for (const key in employeeRoles) {
    if (Object.hasOwnProperty.call(employeeRoles, key)) {
      const data = employeeRoles[key];
      console.log(data);

      let text = document.createElement("p");
      text.classList.add(data["roleid"]);
      text.innerHTML = `${data["rolename"]}`;

      text.style.backgroundColor = `${data["rolecolor"]}`;

      roles.appendChild(text);
    }
  }

  //adding items to container element
  box.appendChild(image);
  box.appendChild(name);
  box.appendChild(bio);
  box.appendChild(roles);

  //getting the container html element and adding the box to it
  var getContainer = document.getElementById("container");
  getContainer.appendChild(box);
}
