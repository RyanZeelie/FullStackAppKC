import React, { useEffect, useState } from "react";
import StudentList from "./StudentList";
import Select from "../../../components/common/inputs/Select";

function ConfirmSemester({
  students,
  values,
  handleChange,
  setFieldValue,
  classDetails,
}) {
  useEffect(() => {
    console.log(classDetails);
    setFieldValue(
      "semesterNumber",
      classDetails.semesterNumber === 0 ? 1 : classDetails.semesterNumber
    );
  }, [classDetails.semesterNumber]);

  const getSemesterEndMessage = (semesterNum) => {
    if (parseInt(semesterNum) != 4) {
      return `You are about to end Semester ${semesterNum} and move to Semester ${
        semesterNum + 1
      }. Are all the students moving on?`;
    }
  };
  return (
    <>
      {classDetails.semesterNumber === 0 ? (
        <Select
          label="Select Semester"
          Id="semesterNumber"
          name="semesterNumber"
          value={values.semesterNumber}
          handleChange={handleChange}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </Select>
      ) : (
        <>
          <div className="bg-orange-400 p-4 rounded-md text-white mb-5">
            <p className="text-md mb-2">{getSemesterEndMessage(classDetails.semesterNumber)}</p>
          </div>
          <p className="text-lg p-2">{`Select a date for the start of Semester ${parseInt(classDetails.semesterNumber) + 1} :`}</p>
          <input className="text-lg p-2" type="date" />
        </>
      )}
      <p>Select students that are moving to the next semester</p>
      <StudentList
        setFieldValue={setFieldValue}
        gradeCourseId={classDetails.gradeCourseId}
        students={students}
        studentIds={values.studentIds}
        semesterId={classDetails.semesterId}
      />
    </>
  );
}

export default ConfirmSemester;
