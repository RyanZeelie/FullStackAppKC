import React, { useEffect, useState } from "react";
import Input from "../../../components/common/inputs/Input";
import Select from "../../../components/common/inputs/Select";
import { useQuery } from "react-query";
import { getClasses } from "../../../api/classesAPI";
import { v4 as uuidv4 } from "uuid";
function AddEdit({ values, handleChange, errors }) {
  const [grade, setGrade] = useState("");
  const { data: classes = [] } = useQuery(["classes"], getClasses, {
    onSuccess: (d) => console.log(d),
  });
  let grades = [...new Set(classes.map((c) => c.gradeName))];

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
        handleChange={(e) => setGrade(e.target.value)}
        value={grade}
        label="Grade"
      >
        <option value={""}>Select a grade</option>
        {grades.map((g) => (
          <option key={uuidv4()} value={g}>
            {g}
          </option>
        ))}
      </Select>
      <Select
        label="Class"
        name="classId"
        value={values.classId}
        handleChange={handleChange}
        error={errors.classId}
      >
        <option value={0}>Select a Class</option>
        {classes
          .filter((x) => x.gradeName === grade)
          .map((c) => {
            return (
              <option
                key={uuidv4()}
                value={c.id}
              >{`${c.name} - (${c.gradeName} - ${c.courseName})`}</option>
            );
          })}
      </Select>
    </>
  );
}

export default AddEdit;
