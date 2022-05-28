const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Voodootown1!",
    database: "tracker_db",
  });

  // function to make connection and throw error it cannot connect
connection.connect(function (err) {
    if (err) throw err;
    firstPrompt();
  });
  
  // Start prompting user
  function firstPrompt() {
    inquirer
      .prompt({
        type: "list",
        name: "task",
        message: "Select Action to Take",
        choices: [
          "View Employees",
          "View Roles",
          "View Departments",
          "Add Department",
          "Add Employee",
          "Remove Employees",
          "Update Employee Role",
          "Add Role",
          "Quit Application",
        ],
      })
      .then(function ({ task }) {
        switch (task) {
          case "View Employees":
            viewEmployee();
            break;
          case "View Departments":
            viewDepartments();
            break;
          case "View Roles":
            viewRoles();
            break;
          case "Add Department":
            addDepartment();
            break;
          case "Add Employee":
            addEmployee();
            break;
          case "Remove Employees":
            removeEmployees();
            break;
          case "Update Employee Role":
            updateEmployeeRole();
            break;
          case "Add Role":
            addRole();
            break;
          case "Quit Application":
            connection.end();
            break;
        }
      });
  }
  
  //View Employee Function
  function viewEmployee() {
    console.log("Viewing employees\n");
  
    var query = `SELECT emp.id, emp.first_name, emp.last_name, r.title, dpt.name AS department, r.salary
    FROM employee emp
    LEFT JOIN role r ON emp.role_id = r.id
    LEFT JOIN department dpt ON r.department_id = dpt.id` ;
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Employees viewed!\n");
  
      firstPrompt();
    });
  }
 // View Departents function
  function viewDepartments(){
      console.log("Showing departments\n");

      var query = `SELECT dep.id, dep.name FROM department dep`;
      connection.query(query, function (err, res) {
        if (err) throw err;
    
        console.table(res);
        console.log("Departments viewed!\n");
    
        firstPrompt();
      });
  }
  
  // Add employee function
  function addEmployee() {
    console.log("Adding employee!\n");
    console.log("These are the current employees");
  
    // var query = `SELECT r.id, r.title, r.salary 
    //     FROM role r`;

    var query = `SELECT emp.id, emp.first_name, emp.last_name
    FROM employee emp`;
    
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const roleChoices = res.map(({ id, title, salary }) => ({
        value: id,
        title: `${title}`,
        salary: `${salary}`,
      }));
  
      console.table(res);
      console.log("New Employee Info:");
  
      promptInsert(roleChoices);
    });
  }
  
  function promptInsert(roleChoices) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Employee's first name",
        },
        {
          type: "input",
          name: "last_name",
          message: "Employee's last name",
        },
        {
          type: "list",
          name: "roleId",
          message: "Employee's role",
          choices: roleChoices,
        },
      ])
      .then(function (answer) {
        console.log(answer);
  
        var query = `INSERT INTO employee SET ?`;
        connection.query(
          query,
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.roleId,
          },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log(res.insertedRows + "Inserted successfully!\n");
  
            firstPrompt();
          }
        );
      });
  }
  
  function removeEmployees() {
    console.log("Deleting employee\n");
    console.log("These are the current employees");
  
    var query = `SELECT emp.id, emp.first_name, emp.last_name
        FROM employee emp`;
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id,
        name: `${id} ${first_name} ${last_name}`,
      }));
  
      console.table(res);
      console.log("Which Employee would you like to Delete?\n");
  
      promptDelete(deleteEmployeeChoices);
    });
  }
  
  function promptDelete(deleteEmployeeChoices) {
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Employee to remove?",
          choices: deleteEmployeeChoices,
        },
      ])
      .then(function (answer) {
        var query = `DELETE FROM employee WHERE ?`;
        connection.query(query, { id: answer.employeeId }, function (err, res) {
          if (err) throw err;
  
          console.table(res);
          console.log(res.affectedRows + " Employee Deleted!\n");
  
          firstPrompt();
        });
      });
  }
  
  function updateEmployeeRole() {
    employeeArray();
  }
  
  function employeeArray() {
    console.log("Updating an employee");
  
    var query = `SELECT emp.id, emp.first_name, emp.last_name, r.title, dpt.name AS department, r.salary
    FROM employee emp
    JOIN role r ON emp.role_id = r.id
    JOIN department dpt ON r.department_id = dpt.id`;
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const employeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id,
        name: `${first_name} ${last_name}`,
      }));
  
      console.table(res);
      console.log("Update Succesful");
  
      roleArray(employeeChoices);
    });
  }
  
  function roleArray(employeeChoices) {
    console.log("Updating role");
  
    var query = `SELECT r.id, r.title, r.salary 
    FROM role r`;
    let roleChoices;
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      roleChoices = res.map(({ id, title, salary }) => ({
        value: id,
        title: `${title}`,
        salary: `${salary}`,
      }));
  
      console.table(res);
      console.log("Update Succesful\n");
  
      promptEmployeeRole(employeeChoices, roleChoices);
    });
  }
  
  function promptEmployeeRole(employeeChoices, roleChoices) {
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Employee to set with the role",
          choices: employeeChoices,
        },
        {
          type: "list",
          name: "roleId",
          message: "Role to update",
          choices: roleChoices,
        },
      ])
      .then(function (answer) {
        var query = `UPDATE employee SET role_id = ? WHERE id = ?`;
        connection.query(
          query,
          [answer.roleId, answer.employeeId],
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log(res.affectedRows + "Updated successfully!");
  
            firstPrompt();
          }
        );
      });
  }
  
  function addRole() {
    var query = `SELECT dpt.id, dpt.name, r.salary AS budget
      FROM employee emp
      JOIN role r
      ON emp.role_id = r.id
      JOIN department dpt ON r.department_id = dpt.id
      GROUP BY dpt.id, dpt.name, r.salary`;
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const departmentChoices = res.map(({ id, name }) => ({
        value: id,
        name: `${id} ${name}`,
      }));
  
      console.table(res);
      console.log("Department array!");
  
      addRole(departmentChoices);
    });
  }
  
    function addRole() {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Role Title",
        },
        {
          name: "salary",
          type: "input",
          message: "Role Salary",
        }
      ])
      .then(function (answer) {
        var query = `INSERT INTO role SET ?`;
  
        connection.query(
          query,
          {
            title: answer.title,
            salary: answer.salary,
          },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log("Role Added!");
  
            firstPrompt();
          }
        );
      });
  }
  
  function addDepartment(departmentChoices) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "departmentName",
          message: "Department Name:",
        },
      ])
      .then(function (answer) {
        var query = `INSERT INTO department SET ?`;
  
        connection.query(
          query,
          {
            name: answer.departmentName,
          },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log("Department Added!");
  
            firstPrompt();
          }
        );
      });
  }
  
  function viewRoles() {
    console.log("Viewing Roles\n");
  
    var query = `SELECT r.title, r.id, dpt.name AS department, r.salary
    FROM role r
    LEFT JOIN department dpt ON r.department_id = dpt.id;`;
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Viewing All Roles");
  
      firstPrompt();
    });
  }