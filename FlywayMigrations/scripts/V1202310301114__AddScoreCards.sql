IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Score')
BEGIN
    CREATE TABLE Score (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        StudentId INT NOT NULL,
        FOREIGN KEY (StudentId) REFERENCES Student(Id),
        SemesterId INT NOT NULL,
        FOREIGN KEY (SemesterId) REFERENCES Semester(Id),
        IsTestTaken BIT,
        Recommendation NVARCHAR(200),
        Listening DECIMAL (10,2),
        Reading DECIMAL (10,2),
        Writing DECIMAL (10,2)
    );
END
