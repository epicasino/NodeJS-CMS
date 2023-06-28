const inquirer = require("inquirer");
const questions = require("./lib/questions");
const Results = require("./lib/Results");

const resultMethods = new Results();

const selectionMenu = () => {
  inquirer.prompt(questions).then((response) => {
    switch (response.mainMenu) {
      case "View All Employees":
        resultMethods.viewEmployees();
        break;
      case "View All Departments":
        resultMethods.viewDepartments();
        break;
      case "View All Roles":
        resultMethods.viewRoles();
        break;
      case "Create New Department":
        resultMethods.createDepartment();
        break;
      case "Create New Role":
        resultMethods.createRole();
        break;
      case "Create New Employee":
        resultMethods.createEmployee();
        break;
      case "Update Employee":
        resultMethods.updateEmployee();
        break;
    };
  });
};

selectionMenu();