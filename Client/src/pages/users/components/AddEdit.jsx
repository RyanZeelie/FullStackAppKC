import React from "react";
import Input from "../../../components/common/inputs/Input";
import Select from "../../../components/common/inputs/Select";
import ConfirmButton from "../../../components/common/buttons/ConfirmButton";
import GeneralNote from "../../../components/common/notifications/GeneralNote";
import { useMutation, useQuery } from "react-query";
import { getUserRolesList, reActivateUser } from "../../../api/usersAPI";

function AddEdit({ values, handleChange, errors }) {
  const { data, mutate, isLoading } = useMutation(reActivateUser);
  const { data: roles = [] } = useQuery(["roles"], getUserRolesList);
  const isAdmin = () => roles.find((x) => x.name === "SuperUser")?.id;

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

      <Select
        label="Role"
        name="role"
        id="role"
        value={values.role}
        handleChange={handleChange}
      >
        {roles.map((role) => {
          return <option value={role.id}>{role.name}</option>;
        })}
      </Select>
      {values.role == isAdmin() && (
        <GeneralNote
          level={"warning"}
          message={"You are assigning admin rights to this user"}
        />
      )}
      {values.id != 0 && (
        <ConfirmButton
          loading={isLoading}
          label="Re Authorize"
          action={() => mutate(values)}
        />
      )}
    </>
  );
}

export default AddEdit;
