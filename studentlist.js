"use strict";

window.addEventListener("DOMContentLoaded", init);

// global variabel of our student
let Student = {
  firstname: "-student-firstname-",
  lastname: "-student-lastname-",
  house: "-house-"
};

const allStudents = [];

function init() {
  console.log("init");

  loadJSON();

  // TODO: Load JSON, create clones, build list, add event listeners, show modal, find images, and other stuff ...
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

function prepareObjects(jsonData) {
  jsonData.forEach(jsonObject => {
    // create a new student object from our student variable
    const student = Object.create(Student);

    //the data from our Json-file we want to split.
    const parts = jsonObject.fullname.split(" ");

    // how we want our data to be split:
    student.firstname = parts[0];
    student.lastname = parts[2];

    // this should be accessed directly from the json-file and not split like the fullname
    student.house = jsonObject.house;

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
function sortList(filteredList) {
  console.log("sortList");

  displayList(filteredList);
}

function displayList(student) {
  // this clears our student list after filtering
  document.querySelector("#list tbody").innerHTML = "";

  // this makes a new list of students to diplay
  student.forEach(displayStudent);
}

function displayStudent(student) {
  // creates a clone from our student
  let clone = document
    .querySelector("template#student")
    .content.cloneNode(true);

  // this sets the data for the clone
  clone.querySelector("[data-field=firstname]").textContent = student.firstname;
  clone.querySelector("[data-field=lastname]").textContent = student.lastname;
  clone.querySelector("[data-field= house]").textContent = student.house;

  // then oure clone is appendet to our list
  document.querySelector("#list tbody").appendChild(clone);
}
