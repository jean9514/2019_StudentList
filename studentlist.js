"use strict";

window.addEventListener("DOMContentLoaded", init);

// global variabel of our student prototype
let Student = {
  fullname: "-fullname_",
  firstname: "-student-firstname-",
  lastname: "-student-lastname-",
  house: "-house-",
  imagename: "-imagename-",
  crest: "-crest-"
};

let selectedFilter = "All Students";
let allStudents = [];
let expelledStudArray = [];
let sorting = " ";
let modal = document.querySelector("#modal");


function init() {
  console.log("init");

  document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", clickFilterHouse);
  });

  // eventlistners on buttons, reacts to wich functions clicked
  document.getElementById("btn_house").addEventListener("click", function() {
    sorting = "house";
    filterList();
  });

  document.getElementById("btn_firstname").addEventListener("click", function() {
      sorting = "first";
      filterList();
    });

  document.getElementById("btn_lastname").addEventListener("click", function() {
    sorting = "last";
    filterList();
  });

  

  loadSecondJSON();
  
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

function loadSecondJSON() {
  console.log("loadJSON");
  fetch("http://petlatkea.dk/2019/hogwarts/families.json")
    .then(response => response.json())
    .then(myJson => {
      // when the json-file gets loaded, it prepares objects.
      // prepareObjects(myJson);
      loadJSON();
    });
}


// this functions displayes the choosen filter button
function clickFilterHouse( event ) {
  selectedFilter = event.target.dataset.house;

  filterList();
}

// the DATA part of the code

// this function splits our data from the json-file into parts( firstname and lastname and so on)
function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject, key) => {

    // create a new student object from our student variable
    const student = Object.create(Student);
    student.id = key;
    //the data from our Json-file that we want to split.
    const parts = jsonObject.fullname.split(" ");

    student.fullname = jsonObject.fullname;

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
    // student.crest = `imgCrests/.png`;

    // this stores all our students in a global array
    allStudents.push(student);
  });

  filterList();
}


// this function filters the array of students befor pasing it allong to be sortet.
function filterList( ) {
  
  function filterByHouse( student ) {
    if( selectedFilter === "All Students" ) {
      return true;
    } else {
      return student.house === selectedFilter;
    }
  }

  let filteredList = allStudents.filter( filterByHouse );
  console.log( filteredList );

  // the sortList should be filtered befor displayed as SORTED.
  sortList(filteredList);
}

// this functions returns the array of sorted students after the click on the button
function sortList(filteredList) {
  console.log("sortList");

  if (sorting === "first") {
    sortByFirstname(filteredList);
  } else if (sorting === "last") {
    sortByLastname(filteredList);
   } else if (sorting === "house") {
    sortByHouse(filteredList);
  }
  // the list of students that eventually hare dispalyed after sorted.
  displayList(filteredList);
}

function sortByFirstname(filteredList) {
  filteredList.sort(compareFirstname);
}
function sortByLastname(filteredList) {
  filteredList.sort(compareLastname);
}
function sortByHouse(filteredList) {
  filteredList.sort(compareHouse);
}


//  the next 3 functions
function compareFirstname(a, b) {
  if (a.firstname < b.firstname) {
    return -1;
  } else {
    return 1;
  }

  console.log("compareFirstname");
}

function compareLastname(a, b) {
  if (a.lastname < b.lastname) {
    return -1;
  } else {
    return 1;
  }

  console.log("compareLastname");
}

function compareHouse(a, b) {
  if (a.house < b.house) {
    return -1;
  } else {
    return 1;
  }

  console.log("compareHouse");
}

function expellStudent(student) {
	// this is adding the expelled student into an array of the expelled students.
    expelledStudArray.push(student);

	// remove the student from the 
    allStudents = allStudents.filter(elem => elem.id !== student.id);

    // remove the student from the original student array 
    allStudents = allStudents.filter(elem => elem.id !== student.id);

    // redisplay "new" array but now without the students that has been expelled
  displayList(allStudents);
  console.log(student);

	// change stats after a person is removed
    // updateStatistics();
}

function displayList(student) {
  // this clears our student list after filtering
  document.querySelector("#list tbody").innerHTML = "";

  // this makes a new list of students to diplay
  student.forEach(displayStudent);
}

// the VISUEL part of the code

function displayStudent(student) {
  console.log(student);

  // creates a clone from our student
  let studentclone = document.querySelector("template#student").content.cloneNode(true);

  // this sets the data for the clone
  studentclone.querySelector("[data-field=firstname]").textContent = student.firstname;
  studentclone.querySelector("[data-field=lastname]").textContent = student.lastname;
  studentclone.querySelector("[data-field= house]").textContent = student.house;
  

  studentclone.querySelector("[data-field=firstname]").addEventListener("click", ()=> {
    showModal(student);
  });
  studentclone.querySelector("[data-action= remove]").addEventListener("click", ()=>{
  expellStudent(student)
});


  // then oure clone is appendet to our list
  document.querySelector("#list tbody").appendChild(studentclone);
}

function showModal(student) {

  console.log(student);
  
  modal.classList.add("show");
  modal.querySelector(".modalName").textContent = student.fullname;
  modal.querySelector(".modalImage").src = student.imagename;
  modal.querySelector(".modalHouse").textContent = student.house;
  
  if (student.house == "Gryffindor") {
    modal.querySelector("[class= modalCrest]").src =
      "imgCrests/Gryffindor.png";
    modal.querySelector("#modal-content").classList.add("gryffindor");
  } else {
    modal.querySelector("#modal-content").classList.remove("gryffindor");
  }

  if (student.house == "Hufflepuff") {
    modal.querySelector("[class= modalCrest]").src =
      "imgCrests/Hunfflepuff.png";
    modal.querySelector("#modal-content").classList.add("hufflepuf");
  } else {
    modal.querySelector("#modal-content").classList.remove("hufflepuf");
  }

  if (student.house == "Ravenclaw") {
    modal.querySelector("[class= modalCrest]").src =
      "imgCrests/Ravenclaw.png";
    modal.querySelector("#modal-content").classList.add("ravenclaw");
  } else {
    modal.querySelector("#modal-content").classList.remove("ravenclaw");
  }

  if (student.house == "Slytherin") {
    modal.querySelector("[class= modalCrest]").src =
      "imgCrests/Slytherin.png";
    modal.querySelector("#modal-content").classList.add("slytherin");
  } else {
    modal.querySelector("#modal-content").classList.remove("slytherin");
  }

  
  
  //when clicked, closes the modal
  modal.querySelector("button").addEventListener("click", hideModal);
}

// this is hiding the modal from the dom
function hideModal() {
  modal.classList.remove("show");
}
