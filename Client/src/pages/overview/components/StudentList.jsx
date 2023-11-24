import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CheckBox from "../../../components/common/inputs/CheckBox";
import { useQuery } from "react-query";
import {
  getStudentsByGrade,
  getCurrentSemesterStudents,
} from "../../../api/studentAPI";
function StudentList({ studentIds = [], setFieldValue, gradeCourseId, semesterId }) {
  const { data: students = [] } = useQuery(
    ["students", { gradeCourseId, semesterId }],
    semesterId === 0 ? getStudentsByGrade : getCurrentSemesterStudents
  );

  return (
    <>
      {students?.map((x) => (
        <CheckBox
          key={uuidv4()}
          name={x.id}
          label={x.englishName}
          onChange={(e) => {
            console.log(
              studentIds.some(
                (studenId) => studenId === parseInt(e.target.name)
              )
            );
            if (
              studentIds.some(
                (studenId) => studenId === parseInt(e.target.name)
              )
            ) {
              let newlistOfIds = studentIds.filter(
                (studentId) => studentId !== parseInt(e.target.name)
              );
              setFieldValue("studentIds", newlistOfIds);
            } else {
              setFieldValue("studentIds", [
                ...studentIds,
                parseInt(e.target.name),
              ]);
            }

            console.log(studentIds);
          }}
          checked={studentIds.some((id) => id === x.id)}
        />
      ))}
    </>
  );
}

export default StudentList;
