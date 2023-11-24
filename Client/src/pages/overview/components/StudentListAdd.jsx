import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CheckBox from "../../../components/common/inputs/CheckBox";
import { useQuery } from "react-query";
import {
  getStudentsByGrade,
  getCurrentSemesterStudents,
} from "../../../api/studentAPI";
function StudentList({ gradeCourseId,studentIds,setStudentIds }) {

  const { data: students = [] } = useQuery(
    ["students", { gradeCourseId }],
    getStudentsByGrade
  );

  return (
    <>
      {students?.map((x) => (
        <CheckBox
          key={uuidv4()}
          name={x.id}
          label={x.englishName}
          onChange={(e) => {
            if (
                studentIds.some(
                (studenId) => studenId === parseInt(e.target.name)
              )
            ) {
              let newlistOfIds = studentIds.filter(
                (studentId) => studentId !== parseInt(e.target.name)
              );
              setStudentIds(newlistOfIds);
            } else {
                setStudentIds([...studentIds, parseInt(e.target.name)]);
            }
          }}
          checked={studentIds.some((id) => id === x.id)}
        />
      ))}
    </>
  );
}

export default StudentList;
