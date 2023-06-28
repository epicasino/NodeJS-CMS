const questions = [
  {
    type: "list",
    message: "Main Menu. Select an option.",
    name: "mainMenu",
    choices: [
      "View All Employees",
      "View All Departments",
      "View All Roles",
      "Create New Department",
      "Create New Role",
      "Create New Employee",
      "Update Employee",
    ],
  },
];

module.exports = questions;
