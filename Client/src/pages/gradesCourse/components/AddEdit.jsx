import React, { useEffect } from "react";
import Select from "../../../components/common/inputs/Select";
import { useQuery } from "react-query";
import { getCourses, getGrades } from "../../../api/AdminAPI";
import { v4 as uuidv4 } from "uuid";

function AddEdit({ values, handleChange, errors }) {
  const { data: grades = [] } = useQuery(["grades"], getGrades);
  const { data: courses = [] } = useQuery(["courses"], getCourses);
  return (
    <>
      <Select
        label="Grade"
        name="gradeId"
        Id="gradeId"
        value={values.gradeId}
        handleChange={handleChange}
        error={errors.gradeId}
      >
        <option value={0}>Select</option>
        {grades.map((grade) => {
          return (
            <option key={uuidv4()} value={grade.id}>
              {grade.name}
            </option>
          );
        })}
      </Select>

      <Select
        label="Course"
        name="courseId"
        Id="courseId"
        value={values.courseId}
        handleChange={handleChange}
        error={errors.courseId}
      >
        <option value={0}>Select</option>
        {courses.map((course) => {
          return (
            <option key={uuidv4()} value={course.id}>
              {course.name}
            </option>
          );
        })}
      </Select>
    </>
  );
}

export default AddEdit;
