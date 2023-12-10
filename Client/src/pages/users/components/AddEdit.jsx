import React, { useEffect, useState } from "react";
import Input from "../../../components/common/inputs/Input";
import Select from "../../../components/common/inputs/Select";
import { v4 as uuidv4 } from "uuid";
function AddEdit({
  values,
  handleChange,
  errors,
  setFieldValue,
  validateField,
}) {
  return (
    <>
      <Input
        label="Name"
        name={"firstName"}
        id="firstName"
        value={values.firstName}
        onChange={handleChange}
        error={errors.firstName}
      />
      <Input
        label="Surnname"
        name={"lastName"}
        id="lastName"
        value={values.lastName}
        onChange={handleChange}
        error={errors.lastName}
      />
      <Input
        label="Email"
        name={"email"}
        id="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
    </>
  );
}

export default AddEdit;
