"use strict";

window.addEventListener("DOMContentLoaded", init);

// global variabel of our student prototype
let Student = {
  firstname: "-student-firstname-",
  lastname: "-student-lastname-",
  house: "-house-",
  imagename: "-imagename-"
};

const allStudents = [];

function init() {
  console.log("init");

  loadJSON();

  // TODO: build list, add event listeners, show modal, find images, and other stuff ...
}

function loadJSON() {
  console.log("loadJSON");
  fetch("http://petlatkea.dk/2019/hogwarts/students.json")
    .then(response => response.json())
    .then(myJson => {
      // when the json-file gets loaded, it prepares objects.
      prepareObjects(myJson);
    });
}

// the DATA part of the code

function prepareObjects(jsonData) {
  jsonData.forEach(jsonObject => {
    // create a new student object from our student variable
    const student = Object.create(Student);

    //the data from our Json-file that we want to split.
    const parts = jsonObject.fullname.split(" ");

    // how we want the data to be displayed:
    student.firstname = parts[0];

    // to get ONLY the last name, we should have the length of the parts -1
    student.lastname = parts[parts.length - 1];

    // this should be accessed directly from the json-file and not split like the fullname
    student.house = jsonObject.house;

    // this is how we connect the img-files to the lastname of the students.
    const lastnameLowcase = parts[parts.length - 1].toLowerCase();
    const firstletterLowcase = parts[0].substring(0, 1).toLowerCase();
    student.imagename = `images/${lastnameLowcase}_${firstletterLowcase}.png`;

    // this stores all our students in a global array
    allStudents.push(student);
  });

  filterList();
}

function filterList() {
  const filteredList = allStudents;
  // the list should be sorted befor it is dispalyed
  sortList(filteredList);
}
function sortList(filteredList, list) {
  console.log("sortList");

  let sortedData;

  if (filteredList === "") {
    sortedData = list;
  }
  if (filteredList === "firstname") {
    sortedData = list.sort(compareFirstname);
  }
  if (filteredList === "lastname") {
    sortedData = list.sort(compareLastname);
  }
  if (filteredList === "house") {
    sortedData = list.sort(compareHouse);
  }

  displayList(filteredList);
}

function compareFirstname(a, b) {
  if (a.firstname < b.firstname) {
    return -1;
  } else {
    return 1;
  }
  console.log("compareFirstname");
}

function compareLastname() {
  if (a.lastname < b.lastname) {
    return -1;
  } else {
    return 1;
  }

  console.log("compareLastname");
}

function compareHouse() {
  if (a.house < b.house) {
    return -1;
  } else {
    return 1;
  }

  console.log("compareHouse");
}

function displayList(student) {
  // this clears our student list after filtering
  document.querySelector("#list tbody").innerHTML = "";

  // this makes a new list of students to diplay
  student.forEach(displayStudent);
}

// the VISUEL part of the code

function displayStudent(student) {
  console.log(displayStudent);
  // list.forEach(displayStudent, list);

  // creates a clone from our student
  let studentclone = document
    .querySelector("template#student")
    .content.cloneNode(true);

  // this sets the data for the clone
  studentclone.querySelector("[data-field=firstname]").textContent =
    student.firstname;
  studentclone.querySelector("[data-field=lastname]").textContent =
    student.lastname;
  studentclone.querySelector("[data-field= house]").textContent = student.house;

  // then oure clone is appendet to our list
  document.querySelector("#list tbody").appendChild(studentclone);
}
