const inquirer = require("inquirer");
const questions = require("./questions");
const mysql = require("mysql2");
const { printTable } = require("console-table-printer");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "company_db",
});

class Results {
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
    });
  }

  viewRoles() {
    db.query(`SELECT * FROM role`, (err, results) => {
      let tableContent = [];
      const generateTable = () => {
        results.forEach((result) => {
          tableContent.push({
            id: result.id,
            title: result.title,
            salary: result.salary,
            department_id: result.department_id,
          });
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

  createRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter new role name.",
          name: "newRoleName",
        },
        {
          type: "input",
          message: "Enter new role salary.",
          name: "newRoleSalary",
        },
        {
          type: "input",
          message: "Enter new role department ID.",
          name: "newRoleDepartment",
        },
      ])
      .then((result) => {
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES ('${result.newRoleName}', ${result.newRoleSalary}, ${result.newRoleDepartment})`,
          (err, results) => {
            err ? console.log(err) : console.log(results);
          }
        );
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
}

module.exports = Results;
