IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Semester')
BEGIN
    CREATE TABLE Semester (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        SemesterNumber INT NOT NULL,
        ClassId INT NOT NULL,
        FOREIGN KEY (ClassId) REFERENCES Class(Id),
        StartDate DATETIME,
        EndDate DATETIME,
    );
END
