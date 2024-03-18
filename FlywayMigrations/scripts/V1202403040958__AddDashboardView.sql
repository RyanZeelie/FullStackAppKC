CREATE VIEW View_Dashboard
AS
SELECT 
    cr.Id AS CourseId,
    cr.Name AS CourseName,
    gc.Id AS GradeCourseId,
    g.Id AS GradeId,
    g.Name AS GradeName,
    COUNT(DISTINCT s.Id) AS StudentCount,
    COUNT(DISTINCT c.Id) AS ClassCount
FROM Class c
JOIN GradeCourse gc 
    ON gc.Id = c.GradeCourseId
JOIN Grade g 
    ON g.Id = gc.GradeId
JOIN Course cr 
    ON cr.Id = gc.CourseId
LEFT JOIN Student s 
    ON s.GradeCourseId = gc.Id
GROUP BY 
    cr.Id, cr.Name, g.Id, g.Name, gc.Id;