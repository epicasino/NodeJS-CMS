const inquirer = require("inquirer");
const questions = require("./lib/questions");
const mysql = require("mysql2");
const { printTable } = require("console-table-printer");

const viewDepartments = () => {
  db.query(`SELECT * FROM department`, (err, results) => {
    let tableContent = [];
    const generateTable = () => {
      results.forEach((result) => {
        tableContent.push({ id: result.id, department_name: result.name });
      });
      printTable(tableContent);
    };
    generateTable();
  });
};

const viewEmployees = () => {
  db.query(`SELECT * FROM employee`, (err, results) => {
    let tableContent = [];
    const generateTable = () => {
      results.forEach((result) => {
        tableContent.push({
          id: result.id,
          first_name: result.first_name,
          last_name: result.last_name,
          role_id: result.role_id,
          manager_id: result.manager_id,
        });
      });
      printTable(tableContent);
    };
    generateTable();
  });
};

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

const selectionMenu = () => {
  inquirer.prompt(questions).then((response) => {
    switch (response.mainMenu) {
      case "View All Employees":
        viewEmployees();
        break;
      case "View All Departments":
        viewDepartments();
        break;
      case "View All Roles":
        viewDepartments();
        break;
    }
  });
};

selectionMenu();
