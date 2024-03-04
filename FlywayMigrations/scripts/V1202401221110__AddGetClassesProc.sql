CREATE OR ALTER PROCEDURE GetClasses
AS

BEGIN

WITH GradeCourseInfo AS (
    SELECT 
        gc.Id,
        g.Name AS GradeName,
        cr.Name AS CourseName
    FROM GradeCourse gc
    JOIN Grade g 
        ON g.Id = gc.GradeId
    JOIN Course cr 
        ON cr.Id = gc.CourseId
),
LevelInfo AS (
    SELECT 
        l.Id,
        l.Name AS LevelName
    FROM Level l
),
SemesterInfo AS (
    SELECT 
        s.ClassId,
        s.StartDate,
        s.EndDate
    FROM Semester s
    WHERE s.EndDate IS NULL
)
SELECT 
    c.Id,
    c.Name,
    c.GradeCourseId,
    c.LevelId,
    gc.GradeName,
    gc.CourseName,
    l.LevelName,
    s.StartDate,
    s.EndDate
FROM Class c
JOIN GradeCourseInfo gc ON gc.Id = c.GradeCourseId
JOIN LevelInfo l ON l.Id = c.LevelId
LEFT JOIN SemesterInfo s ON s.ClassId = c.Id;

END