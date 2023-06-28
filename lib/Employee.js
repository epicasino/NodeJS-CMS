const inquirer = require("inquirer");
const mysql = require("mysql2");
const { printTable } = require("console-table-printer");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "company_db",
});

class Employee {
  employeeMenu() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Employee Menu. Select an option.",
          name: "mainMenu",
          choices: [
            "View All Employees",
            "Create New Employee",
            "Update Employee",
            "Delete Employee",
          ],
        },
      ])
      .then((selection) => {
        switch (selection.mainMenu) {
          case "View All Employees":
            this.viewEmployees();
            break;
          case "Create New Employee":
            this.createEmployee();
            break;
          case "Update Employee":
            this.updateEmployee();
            break;
          case "Delete Employee":
            this.deleteEmployee();
            break;
        }
      });
  }

  viewEmployees() {
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
      // inquirer.prompt([])
    });
  }

  createEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter employee's first name.",
          name: "newEmployeeFName",
        },
        {
          type: "input",
          message: "Enter employee's last name.",
          name: "newEmployeeLName",
        },
        {
          type: "input",
          message: "Enter employee's role ID.",
          name: "newEmployeeRoleID",
        },
        {
          type: "input",
          message: "Enter employee's manager ID. (Type Null if Manager)",
          name: "newEmployeeManagerId",
        },
      ])
      .then((result) => {
        const {
          newEmployeeFName,
          newEmployeeLName,
          newEmployeeRoleID,
          newEmployeeManagerId,
        } = result;
        db.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${newEmployeeFName}', '${newEmployeeLName}', ${newEmployeeRoleID}, ${newEmployeeManagerId})`,
          (err, results) => {
            err ? console.log(err) : console.log(results);
          }
        );
      });
  }

  updateEmployee() {
    db.query(
      `SELECT CONCAT(first_name, " ", last_name) AS full_name FROM employee`,
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          let fullNames = [];
          results.forEach((result) => {
            fullNames.push(result.full_name);
          });

          inquirer
            .prompt([
              {
                type: "list",
                message: "Select Employee.",
                name: "employeeList",
                choices: fullNames,
              },
              {
                type: "type",
                message: "Enter Role ID",
                name: "employeeRole",
              },
            ])
            .then((results) => {
              let splitName = results.employeeList.split(" ");
              db.query(
                `UPDATE employee SET role_id = ${results.employeeRole} WHERE first_name = "${splitName[0]}" AND last_name = "${splitName[1]}"`,
                (err, results) =>
                  err ? console.log(err) : console.log(results)
              );
            });
        }
      }
    );
  }

  deleteEmployee() {
    db.query(
      `SELECT CONCAT(first_name, " ", last_name) AS full_name FROM employee`,
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          let fullNames = [];
          results.forEach((result) => {
            fullNames.push(result.full_name);
          });

          inquirer
            .prompt([
              {
                type: "list",
                message: "Select Employee To Delete.",
                name: "employeeList",
                choices: fullNames,
              },
            ])
            .then((results) => {
              let splitName = results.employeeList.split(" ");
              db.query(
                `DELETE FROM employee WHERE first_name = "${splitName[0]}" AND last_name = "${splitName[1]}"`,
                (err, results) =>
                  err ? console.log(err) : console.log(results)
              );
            });
        }
      }
    );
  }
};

module.exports = Employee;
