USE company_db;

INSERT INTO department (name)
  VALUES("Sales"),
        ("Operations"),
        ("Finances"),
        ("HR"),
        ("IT");

INSERT INTO role (title, salary, department_id)
  VALUES('Sales Manager', 100000, 1),
        ('Sales Secretary', 80000, 1),
        ('Sales Associate', 70000, 1),
        ('Operations Manager', 100000, 2),
        ('Operations Assistant', 70000, 2),
        ('Head Treasurer', 125000, 3),
        ('Assistant Treasurer', 80000, 3),
        ('HR Manager', 100500, 4),
        ('HR Associate', 85000, 4),
        ('IT Manager', 110000, 5),
        ('IT Associate', 80000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES('Dean','Som',1, NULL),
		    ('Jon','Win',4, NULL),
        ('Paul','Markle',6, NULL),
        ('Karl','Ancheta',8, NULL),
        ('Ben', 'Nguyen', 10, NULL),
        ('Bobby', 'Lee', 3, 1 ),
		    ('Ken', 'Jeong', 2, 1 ),
        ('Ben', 'Rover', 5, 2),
        ('Mark', 'Pale', 7, 3),
        ('Justin', 'Mels', 9, 4),
        ('LeBron', 'James', 11, 5);
