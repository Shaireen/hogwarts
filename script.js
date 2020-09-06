"use strict";

window.addEventListener("DOMContentLoaded", start);
const Student = {
  firstName: "",
  middleName: "unknown",
  lastName: "no last name provided",
  nickName: "this student has no nickname",
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
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    //remove spaces from beginning and end of the string
    jsonObject.fullname = jsonObject.fullname.toLowerCase().trim();

    //if the name includes a hyphen, capitalize first letter after the hyphen
    if (jsonObject.fullname.includes("-")) {
      jsonObject.fullname =
        jsonObject.fullname.slice(0, jsonObject.fullname.indexOf("-") + 1) +
        jsonObject.fullname
          .charAt(jsonObject.fullname.indexOf("-") + 1)
          .toUpperCase() +
        jsonObject.fullname.slice(jsonObject.fullname.indexOf("-") + 2);
    }

    //set house name to lower case
    jsonObject.house = jsonObject.house.toLowerCase().trim();

    //capitalize first letter of the house name
    jsonObject.house =
      jsonObject.house.charAt(0).toUpperCase() + jsonObject.house.slice(1);

    //split the strings from fullname
    const separateName = jsonObject.fullname.split(" ");

    //capitalize first letter of each string (first name, last name, middle name or nickname)
    separateName.forEach((nameString) => {
      if (nameString.charAt(0) == '"') {
        separateName[separateName.indexOf(nameString)] =
          '"' +
          nameString.charAt(1).toUpperCase() +
          nameString.slice(2, nameString.length - 1);
      } else {
        separateName[separateName.indexOf(nameString)] =
          nameString.charAt(0).toUpperCase() + nameString.slice(1);
      }
    });

    //create new object
    const oneStudent = Object.create(Student);

    //set the student's first name
    oneStudent.firstName = separateName[0];

    //set the last name, middle name and nickname
    if (separateName.length == 3) {
      if (separateName[1].charAt(0) == '"') {
        oneStudent.nickName = separateName[1].slice(1);
        oneStudent.middleName = undefined;
      } else {
        oneStudent.middleName = separateName[1];
      }
      oneStudent.lastName = separateName[2];
    } else {
      oneStudent.middleName = undefined;
      oneStudent.lastName = separateName[1];
    }
    oneStudent.house = jsonObject.house;

    //set the photo url
    if (oneStudent.lastName && oneStudent.lastName.includes("-")) {
      const dividedLastName = oneStudent.lastName.split("-");
      oneStudent.photo =
        "photos/" +
        dividedLastName[1].toLowerCase() +
        "_" +
        oneStudent.firstName.charAt(0).toLowerCase() +
        ".png";
    } else if (oneStudent.lastName) {
      oneStudent.photo =
        "photos/" +
        oneStudent.lastName.toLowerCase() +
        "_" +
        oneStudent.firstName.charAt(0).toLowerCase() +
        ".png";
    } else {
      oneStudent.photo = undefined;
    }
    //push the object (one student) to array of all students
    allStudents.push(oneStudent);
  });
  console.table(allStudents);
}
