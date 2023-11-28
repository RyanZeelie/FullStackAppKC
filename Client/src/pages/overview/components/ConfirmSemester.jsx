import React, { useEffect, useState } from "react";
import StudentList from "./StudentList";
import Select from "../../../components/common/inputs/Select";
import GeneralNote from "../../../components/common/notifications/GeneralNote";
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
    if (parseInt(semesterNum) != 2) {
      return `You are about to end Semester ${semesterNum} and move to Semester ${
        semesterNum + 1
      }. Select the students that are moving on to the next semester`;
    } else {
      return `You are about to end Semester ${semesterNum}`;
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
        </Select>
      ) : (
        <>
          {classDetails.semesterNumber != 2 && (
            <GeneralNote
              level={"info"}
              message={`Select a date for the start of Semester ${
                parseInt(classDetails.semesterNumber) + 1
              }`}
            />
          )}

          <input className="text-lg " type="date" />
          <GeneralNote
            level={"warning"}
            message={getSemesterEndMessage(classDetails.semesterNumber)}
          />
        </>
      )}
      {classDetails.semesterNumber != 2 && (
        <StudentList
          setFieldValue={setFieldValue}
          gradeCourseId={classDetails.gradeCourseId}
          students={students}
          studentIds={values.studentIds}
          semesterId={classDetails.semesterId}
        />
      )}
    </>
  );
}

export default ConfirmSemester;
