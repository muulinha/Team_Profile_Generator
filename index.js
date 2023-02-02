const generateHTML = require("./src/GenerateHTML");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/intern");

const inquirer = require("inquirer");
const fs = require("fs");

const teamArray = [];

const addManager = () => {
    return inquirer
      .prompt([
        {
          type: "input",
          message: "Hello team manager! What is your name?",
          name: "name",
        },
        {
          type: "input",
          message: "What is your employee ID number?",
          name: "id",
        },
        {
          type: "input",
          message: "What is your email address?",
          name: "email",
        },
        {
          type: "input",
          message: "What is your office number?",
          name: "officeNumber",
        },
    ])
    .then((managerInput) => {
      const { name, id, email, officeNumber } = managerInput;
      const manager = new Manager(name, id, email, officeNumber);
      teamArray.push(manager);
    });
};

const addEmployee = () => {
    return inquirer
      .prompt([
        {
          type: "list",
          message: "Select your employee's role.",
          choices: ["Engineer", "Intern"],
          name: "role",
        },
        {
          type: "input",
          message: "What is your employee's name?",
          name: "name",
        },
        {
          type: "input",
          message: "What is your employee's ID number?",
          name: "id",
        },
        {
          type: "input",
          message: "What is your employee's email address?",
          name: "email",
        },
        {
          type: "input",
          message: "What is your employess's GitHub username?",
          when: (input) => input.role === "Engineer",
          name: "github",
        },
        {
          type: "input",
          message: "What school does your intern attend?",
          when: (input) => input.role === "Intern",
          name: "school",
        },
        {
          type: "confirm",
          message: "Would you like to add more employees to your team?",
          default: false,
          name: "confirmEmployee",
        },
      ])
  
      .then((employeeData) => {
        let { name, id, email, role, github, school, confirmEmployee } = employeeData;
        let employee;
  
        if (role === "Engineer") {
          employee = new Engineer(name, id, email, github);
        } else if (role === "Intern") {
          employee = new Intern(name, id, email, school);
        }
        teamArray.push(employee);
  
        if (confirmEmployee) {
          return addEmployee(teamArray);
        } else {
          return teamArray;
        }
      });
  };
  
const writeFile = (data) => {
    fs.writeFile("./dist/index.html", data, (err) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log("Your team profile has been generated!");
      }
    });
  };
  
  addManager()
    .then(addEmployee)
    .then((teamArray) => {
      return generateHTML(teamArray);
    })
    .then((pageHTML) => {
      return writeFile(pageHTML);
    })
    .catch((err) => {
      console.log(err);
    });