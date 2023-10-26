import React, { useEffect } from "react";
import Input from "../../../components/common/inputs/Input";

function AddEdit({ values, handleChange, errors }) {

  return (
    <>
      <Input
        label="Course Name"
        name={"name"}
        id="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
      />
    </>
  );
}

export default AddEdit;
