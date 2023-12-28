import React from "react";
import Input from "../../../components/common/inputs/Input";
import ConfirmButton from "../../../components/common/buttons/ConfirmButton";
import { useMutation } from "react-query";
import { reActivateUser } from "../../../api/usersAPI";
function AddEdit({
  values,
  handleChange,
  errors
}) {
  const { data, mutate, isLoading } = useMutation(reActivateUser);

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
      {values.id != 0 && (
        <ConfirmButton loading={isLoading} label="Re Authorize" action={() => mutate(values)} />
      )}
    </>
  );
}

export default AddEdit;
