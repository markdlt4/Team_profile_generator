const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// creating team funciton form employee js
let allEmployees = [];
function createTeam() {
  return inquirer
    .prompt([
      {
        message: "Select an employee type",
        choices: ["Manager", "Engineer", "Intern"],
        type: "list",
        name: "employeeType",
      },
      {
        message: "Employee name",
        type: "input",
        name: "employeeName",
      },
      {
        message: "Employee Id",
        type: "input",
        name: "employeeId",
      },
      {
        message: "Employee email",
        type: "input",
        name: "employeeEmail",
      },
    ])
    .then(function (res) {
      const { employeeType } = res;
      const { employeeName, employeeId, employeeEmail } = res;

      if (employeeType === "Manager") {
        inquirer
          .prompt([
            {
              message: "Phone number",
              type: "input",
              name: "officeNumber",
            },
            {
              message: "Are you done adding?",
              type: "confirm",
              name: "done",
            },
          ])
          .then(function (res2) {
            const { officeNumber } = res2;
            let manager = new Manager(
              employeeName,
              employeeId,
              employeeEmail,
              officeNumber
            );
            allEmployees.push(manager);
            res2.done ? compiledAllEmployees() : createTeam();
          });
      } else if (employeeType === "Engineer") {
        inquirer
          .prompt([
            {
              message: "GitHub",
              type: "input",
              name: "github",
            },
            {
              message: "Are you done adding?",
              type: "confirm",
              name: "done",
            },
          ])
          .then(function (res3) {
            const { github } = res3;
            let engineer = new Engineer(
              employeeName,
              employeeId,
              employeeEmail,
              github
            );
            allEmployees.push(engineer);
            res3.done ? compiledAllEmployees() : createTeam();
          });
      } else if (employeeType === "Intern") {
        inquirer
          .prompt([
            {
              message: "School",
              type: "input",
              name: "school",
            },
            {
              message: "Are you done adding?",
              type: "confirm",
              name: "done",
            },
          ])
          .then(function (res4) {
            const { school } = res4;
            let intern = new Intern(
              employeeName,
              employeeId,
              employeeEmail,
              school
            );
            allEmployees.push(intern);
            res4.done ? compiledAllEmployees() : createTeam();
          });
      }
    });
}

createTeam();

function compiledAllEmployees() {
  fs.writeFile("output/employees.html", render(allEmployees), function (err) {
    if (err) throw err;
  });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
