CREATE DATABASE organisation;
USE organisation;

CREATE TABLE `user`(
	user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    phone INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_at TIMESTAMP ON UPDATE NOW(),
    updated_by INT);
    
ALTER TABLE `user`
MODIFY COLUMN phone BIGINT;
    
CREATE TABLE user_cred(
	user_id INT PRIMARY KEY,
    password_hash VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES `user`(user_id) ON DELETE CASCADE ON UPDATE CASCADE);
    
CREATE TABLE `role`(
	role_id VARCHAR(20),
    role_name VARCHAR(50));

ALTER TABLE `role`
ADD PRIMARY KEY (role_id);
    
CREATE TABLE user_role(
	user_id INT,
    role_id VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_at TIMESTAMP ON UPDATE NOW(),
    updated_by INT,
    FOREIGN KEY (user_id) REFERENCES `user`(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (role_id) REFERENCES `role`(role_id) ON DELETE CASCADE ON UPDATE CASCADE);
    
INSERT INTO `user`(user_name, email, phone, created_by)
VALUES
('Iron man', 'ironman@gmail.com', 8906784578, 1);

SELECT * FROM `user`;
TRUNCATE `user`;

INSERT INTO `user`(user_name, email, phone, created_by)
VALUES
('Bat man', 'batman@gmail.com', 8906784587, 2);

DELETE FROM `user`
WHERE user_id=3;

SELECT * FROM user_cred;
SELECT * FROM user_role;
SELECT * FROM role;
DESC role;

UPDATE user
    SET is_active = 1
    WHERE user_id = 17;

ALTER TABLE `user`
ADD COLUMN is_active BOOLEAN DEFAULT 1;

INSERT INTO role(role_id, role_name)
VALUES 
('R001', 'USER'),
('R002', 'ADMIN');

INSERT INTO user_role(user_id, role_id)
VALUES
(16, 'R001'),
(17, 'R001');

UPDATE user_role
SET role_id = 'R002'
WHERE user_id = 16;

ALTER TABLE user_role
ADD COLUMN org_id INT;

ALTER TABLE user_role
ADD CONSTRAINT user_role_ibfk_3
FOREIGN KEY (org_id) REFERENCES organisation(org_id);

CREATE TABLE organisation (
	org_id INT PRIMARY KEY AUTO_INCREMENT,
    org_name VARCHAR(50),
    owner_id INT,
    is_active BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_at TIMESTAMP ON UPDATE NOW(),
    updated_by INT);

ALTER TABLE organisation
RENAME COLUMN owner_id TO owner_name;

ALTER TABLE organisation
MODIFY COLUMN org_name VARCHAR(50) UNIQUE;

DELETE FROM organisation
WHERE org_id = 2;

INSERT INTO organisation(org_name, owner_name, created_by)
VALUES
('TechNova Solutions', 'Arjun Mehta', 16),
('BlueWave Technologies', 'Priya Sharma', 17),
('GreenLeaf Innovations', 'Rohan Iyer', 18),
('QuantumEdge Systems', 'Ananya Nair', 19),
('SkyBridge Analytics', 'Vikram Singh', 16),
('NextGen Robotics', 'Sneha Kapoor', 17),
('Apex Data Labs', 'Karan Patel', 18),
('Nimbus Cloud Services', 'Rahul Verma', 19),
('SilverLine Software', 'Neha Gupta', 16),
('FusionCore Technologies', 'Aditya Rao', 17),
('BrightPath Consulting', 'Pooja Reddy', 18),
('DeltaByte Systems', 'Siddharth Jain', 19),
('Vertex Solutions', 'Meera Krishnan', 16),
('CodeSphere Labs', 'Amit Agarwal', 17),
('PrimeLogic Technologies', 'Divya Menon', 18),
('InnovaStack Systems', 'Nikhil Bansal', 19),
('OrbitTech Solutions', 'Kavya Subramanian', 16),
('AlphaGrid Networks', 'Manish Chatterjee', 17),
('SparkMind Innovations', 'Shreya Kulkarni', 18),
('CoreVista Technologies', 'Abhishek Mishra', 19);

SELECT * FROM organisation;
SELECT * FROM user_role;

UPDATE user_role
SET org_id = 4
WHERE user_id = 16;

UPDATE user_role
SET org_id = 5
WHERE user_id = 17;

UPDATE user_role
SET org_id = 6
WHERE user_id = 18;

UPDATE user_role
SET org_id = 1
WHERE user_id = 19;

INSERT INTO user_role(user_id, role_id, org_id)
VALUES
(16, 'R001', 7),
(17, 'R002', 8),
(18, 'R002', 9),
(19, 'R002', 10),
(16, 'R002', 11),
(17, 'R002', 12),
(18, 'R001', 13),
(19, 'R001', 14),
(16, 'R001', 15),
(17, 'R001', 16);

SELECT org_id 
FROM user_role
WHERE user_id = 16;

SET SQL_SAFE_UPDATES = 0;
UPDATE organisation SET is_active=1;

SELECT
        o.org_name,
        r.role_name
        FROM organisation o
        JOIN user_role ur
        ON o.org_id = ur.org_id
        JOIN role r
        ON r.role_id=ur.role_id
        WHERE r.role_name = 'USER' AND is_active=1 AND ur.user_id = 17;
        
CREATE TABLE task(
	task_id INT PRIMARY KEY AUTO_INCREMENT,
    task_name VARCHAR(50),
    org_id INT,
    assignee INT,
    reporter INT,
    is_active BOOLEAN,
    task_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_at TIMESTAMP ON UPDATE NOW(),
    updated_by INT,
    FOREIGN KEY (org_id) REFERENCES organisation(org_id) ON DELETE CASCADE ON UPDATE CASCADE);
    
SELECT * FROM task;