const inquirer = require("inquirer");
const Department = require("./Department");
const Role = require("./Role");
const Employee = require("./Employee");

const department = new Department();
const role = new Role();
const employee = new Employee();

class Menu {
  mainMenu() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Main Menu. Select a section.",
          name: "mainMenu",
          choices: [
            "View Department Options",
            "View Role Options",
            "View Employee Options",
          ],
        },
      ])
      .then((selection) => {
        switch(selection.mainMenu) {
          case "View Department Options":
            department.departmentMenu();
            break;
          case "View Role Options":
            role.roleMenu();
            break;
          case "View Employee Options":
            employee.employeeMenu();
            break;
        }
      });
  }
}

module.exports = Menu;
