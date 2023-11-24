import React, { useEffect, useState } from "react";
import Input from "../../../components/common/inputs/Input";
import Select from "../../../components/common/inputs/Select";
import { useQuery } from "react-query";
import { getClasses } from "../../../api/classesAPI";
import {getGradesCourses } from "../../../api/AdminAPI";
import { v4 as uuidv4 } from "uuid";
function AddEdit({
  values,
  handleChange,
  errors,
  setFieldValue,
  validateField,
}) {
  const { data: grades = [] } = useQuery(["gradeCourses"], getGradesCourses, {
    onSuccess: (d) => console.log(d),
  });

  return (
    <>
      <Input
        label="English Name"
        name={"englishName"}
        id="englishName"
        value={values.englishName}
        onChange={handleChange}
        error={errors.englishName}
      />
      <Input
        label="Surnname"
        name={"surname"}
        id="surname"
        value={values.surname}
        onChange={handleChange}
        error={errors.surname}
      />
      <Input
        label="Chinese Name"
        name={"chineseName"}
        id="chineseName"
        value={values.chineseName}
        onChange={handleChange}
        error={errors.chineseName}
      />
      <Select
        handleChange={handleChange}
        value={values.gradeId}
        label="Grade"
        name="gradeId"
        error={errors.gradeId}
      >
        <option value={0}>Select a grade</option>
        {grades.map((g) => (
          <option key={uuidv4()} value={g.id}>
            {`${g.gradeName} - ${g.courseName}`}
          </option>
        ))}
      </Select>
  
    </>
  );
}

export default AddEdit;
