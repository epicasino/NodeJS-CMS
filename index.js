const inquirer = require("inquirer");
const questions = require('./lib/questions');
const mysql = require("mysql2");


// const viewDepartments = () => {
//   db.query(`SELECT * FROM department`, (err, results) => {
//     console.table(results)
//   })
// }

// const viewEmployees = () => {
//   db.query(`SELECT * FROM employee`, (err, results) => {
//     console.table(results)
//   });
// };

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

inquirer
  .prompt(questions)
  .then((response) => {
    switch(response.mainMenu) {
      case "View All Employees":
        viewEmployees();
        break;
      case "View All Departments":
        viewDepartments();
        break;
    }
    
  });

