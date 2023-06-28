const inquirer = require("inquirer");
const mysql = require("mysql2");
const { printTable } = require("console-table-printer");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "company_db",
});

class Role {
  roleMenu() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Roles Menu. Select an option.",
          name: "mainMenu",
          choices: ["View All Roles", "Create New Role", "Delete Role"],
        },
      ])
      .then((selection) => {
        switch (selection.mainMenu) {
          case "View All Roles":
            this.viewRoles();
            break;
          case "Create New Role":
            this.createRole();
            break;
          case "Delete Role":
            this.deleteRole();
            break;
        }
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

  deleteRole() {
    db.query(`SELECT * FROM role`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        let roleNames = [];
        results.forEach((result) => {
          roleNames.push(result.title);
        });
        inquirer
          .prompt([
            {
              type: "list",
              message: "Choose a role to delete",
              choices: roleNames,
              name: "roleList",
            },
          ])
          .then((data) => {
            db.query(
              `DELETE FROM role WHERE name = ?`,
              data.roleList,
              (err, results) => {
                err ? console.log(err) : console.log(results);
              }
            );
          });
      }
    });
  }
}

module.exports = Role;
