import React from "react";
import Input from "../../../components/common/inputs/Input";

function AddEdit({ values, handleChange, errors }) {
  return (
    <>
      <Input
        label="Grade Name"
        name={"Name"}
        id="Name"
        value={values.Name}
        onChange={handleChange}
        error={errors.Name}
      />
    </>
  );
}

export default AddEdit;
