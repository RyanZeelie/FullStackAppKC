import React, { useEffect } from "react";
import Input from "../../../components/common/inputs/Input";

function AddEdit({ values, handleChange, errors }) {

  return (
    <>
      <Input
        label="Level Name"
        name={"name"}
        id="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
      />
        <Input
        label="Total Score"
        name={"total"}
        id="total"
        value={values.total}
        onChange={handleChange}
        error={errors.total}
      />
    </>
  );
}

export default AddEdit;
