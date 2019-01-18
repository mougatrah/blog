drop database if exists blogdb;
create database blogdb;
use blogdb;

insert into Users (username, password, createdAt, updatedAt) VALUES ("user1", "password", NOW(), NOW());
insert into Users (username, password, createdAt, updatedAt) VALUES ("user2", "password", NOW(), NOW());
insert into Users (username, password, createdAt, updatedAt) VALUES ("user3", "password", NOW(), NOW());
insert into Users (username, password, createdAt, updatedAt) VALUES ("user4", "password", NOW(), NOW());

select * from Users;