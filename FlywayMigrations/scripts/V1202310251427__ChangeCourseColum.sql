IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS  WHERE TABLE_NAME = 'Course' AND COLUMN_NAME = 'CourseName')
BEGIN
    EXEC sp_rename '[CM].[dbo].[Course].CourseName', 'Name', 'COLUMN';
END

