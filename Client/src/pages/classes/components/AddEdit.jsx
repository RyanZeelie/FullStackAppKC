import React, { useEffect } from "react";
import Select from "../../../components/common/inputs/Select";
import { useQuery } from "react-query";
import { getGradesCourses, getLevels } from "../../../api/AdminAPI";
import { v4 as uuidv4 } from "uuid";
import Input from "../../../components/common/inputs/Input";
import Checkbox from "../../../components/common/inputs/CheckBox";

function AddEdit({ values, handleChange, errors }) {
  const { data: gradesCourses = [] } = useQuery(
    ["gradesCourses"],
    getGradesCourses
  );
  const { data: levels = [] } = useQuery(["levels"], getLevels);
  return (
    <>
      <Input
        name="name"
        id="name"
        onChange={handleChange}
        value={values.name}
        label="Class Name"
        error={errors?.name}
      />
      <Select
        label="Grade and Course"
        name="gradeCourseId"
        Id="gradeCourseId"
        value={values.gradeCourseId}
        handleChange={handleChange}
        error={errors?.gradeCourseId}
      >
        <option value={0}>Select</option>
        {gradesCourses.map((gc) => {
          return (
            <option key={uuidv4()} value={gc.id}>
              {`${gc.gradeName} - ${gc.courseName}`}
            </option>
          );
        })}
      </Select>

      <Select
        label="Level"
        name="levelId"
        Id="levelId"
        value={values.levelId}
        handleChange={handleChange}
        error={errors?.levelId}
      >
        <option value={0}>Select</option>
        {levels.map((level) => {
          return (
            <option key={uuidv4()} value={level.id}>
              {level.name}
            </option>
          );
        })}
      </Select>
    </>
  );
}

export default AddEdit;
