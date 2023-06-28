const inquirer = require("inquirer");
const mysql = require("mysql2");
const { printTable } = require("console-table-printer");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "company_db",
});

class Department {
  departmentMenu() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Department Menu. Select an option.",
          name: "mainMenu",
          choices: [
            "View All Departments",
            "Create New Department",
            "Delete Department",
          ],
        },
      ])
      .then((selection) => {
        switch (selection.mainMenu) {
          case "View All Departments":
            this.viewDepartments();
            break;
          case "Create New Department":
            this.createDepartment();
            break;
          case "Delete Department":
            this.deleteDepartment();
            break;
        }
      });
  }

  viewDepartments() {
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
  }

  createDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Input name of new department.",
          name: "newDepartmentInput",
        },
      ])
      .then((result) => {
        db.query(
          `INSERT INTO department (name) VALUES (?)`,
          result.newDepartmentInput,
          (err, results) => {
            err ? console.log(err) : console.log(results);
          }
        );
      });
  }

  deleteDepartment() {
    db.query(`SELECT * FROM department`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        let departmentNames = [];
        results.forEach((result) => {
          departmentNames.push(result.name);
        });
        inquirer
          .prompt([
            {
              type: "list",
              message: "Choose a department to delete",
              choices: departmentNames,
              name: "departmentList",
            },
          ])
          .then((data) => {
            db.query(
              `DELETE FROM department WHERE name = ?`,
              data.departmentList,
              (err, results) => {
                err ? console.log(err) : console.log(results);
              }
            );
          });
      }
    });
  }
}

module.exports = Department;
