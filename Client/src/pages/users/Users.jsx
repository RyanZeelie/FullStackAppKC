import React, { useState } from "react";
import { EditIcon } from "../../components/common/icons/Icons";
import ToolTip from "../../components/common/tooltip/ToolTipWrapper";
import DataGrid from "../../components/datagrid/DataGrid";
import { useQuery } from "react-query";
import { getAllUsers } from "../../api/usersAPI";
import FormModal from "../../components/common/modals/FormModal";
import AddEdit from "../users/components/AddEdit";
import { useFormik } from "formik";

const initialFormState = {
    id: 0,
    firstName: "",
    lastName: "",
    email: ""
  };
  
function Users() {
  const { data: users } = useQuery("users", getAllUsers);
  const [modalOpen, setModalOpen] = useState(false)
  const [userForUpdate, setUserForUpdate] = useState(null)
  const handleModal = () => {
    setModalOpen(!modalOpen);
  };
  const handleEdit = async (selectedRow) =>{
    console.log(selectedRow);
    await setValues(selectedRow, true);
    handleModal();
  } 
  const handleCreate = () =>{
    setValues(initialFormState);
    handleModal()
  } 
  const columns = [
    {
      header: "Actions",
      renderCell: (row) => {
        return (
          <>
            <button onClick={() => handleEdit(row)}>
              {" "}
              <ToolTip text={"Edit"}>
                <EditIcon />
              </ToolTip>
            </button>
          </>
        );
      },
    },
    {
      header: "Name",
      dataIdentifier: "firstName",
    },
    {
      header: "Surname",
      dataIdentifier: "lastName",
    },
    {
      header: "Email",
      dataIdentifier: "email",
    },
    {
      header: "Create Date",
      dataIdentifier: "createDate",
      renderCell: (row) => {
        return new Date(row.createDate).toLocaleDateString();
      },
    },
  ];

  const {
    values,
    handleChange,
    isValid,
    errors,
    setValues,
    submitForm,
    setFieldValue,
    validateField
  } = useFormik({
    initialValues: {
      id: 0,
      firstName: "",
      lastName: "",
      email: ""
    },
 //   validationSchema: validation,
    validateOnMount: true,
    onSubmit: (vals) => {
     
    },
  });

  return <>
      <FormModal
        isOpen={modalOpen}
        handleModal={handleModal}
        modalTitle={`${values.id === 0 ? "Create" : "Edit"} User`}
        disabled={!isValid}
        submit={submitForm}
      >
        <AddEdit
          values={values}
          handleChange={handleChange}
          errors={errors}
          setFieldValue={setFieldValue}
          validateField={validateField}
        />
      </FormModal>
      <DataGrid data={users} columns={columns} actions={[{ actionLabel: "Create User", actionFunc: handleCreate }]} />
  </>
}

export default Users;
