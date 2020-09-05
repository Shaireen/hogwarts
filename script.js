"use strict";

window.addEventListener("DOMContentLoaded", start);
const Student = {
  firstName: "",
  middleName: "unknown",
  lastName: "",
  nickName: "",
  photo: "photo unavailable",
  house: "not assigned to any house",
};

const allStudents = [];

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("https://petlatkea.dk/2020/hogwarts/students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      console.log(jsonData);
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array
    /** const separateStrings = jsonObject.fullname.split(" ");
    jsonObject.name = separateStrings[0];
    jsonObject.desc = separateStrings[2];
    jsonObject.type = separateStrings[3];
    // TODO: MISSING CODE HERE !!!
    const oneAnimal = Object.create(Animal);
    oneAnimal.name = jsonObject.name;
    oneAnimal.desc = jsonObject.desc;
    oneAnimal.type = jsonObject.type;
    oneAnimal.age = jsonObject.age;
    allAnimals.push(oneAnimal);
    console.log(allAnimals); **/
  });

  // displayList();
}
/** 
function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allAnimals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
**/
