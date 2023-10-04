CREATE TABLE Student (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    EnglishName VARCHAR(20) NOT NULL,
    Surname VARCHAR(20),
    ChineseName VARCHAR(50),
    ClassId INT,
    FOREIGN KEY (ClassId) REFERENCES Class(Id)
);