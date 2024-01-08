import React, { useState } from "react";
import { EditIcon } from "../../components/common/icons/Icons";
import ToolTip from "../../components/common/tooltip/ToolTipWrapper";
import DataGrid from "../../components/datagrid/DataGrid";
import { useMutation, useQuery } from "react-query";
import { createUser, getAllUsers } from "../../api/usersAPI";
import FormModal from "../../components/common/modals/FormModal";
import AddEdit from "../users/components/AddEdit";
import { useFormik } from "formik";
import TableChip from "../../components/common/chips/TableChip";
import { toast } from "react-toastify";
const initialFormState = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    role:0
  };
  
function Users() {
  const { data: users } = useQuery("users", getAllUsers);
  const {mutate : createNewUser, isLoading} = useMutation(createUser, {onSuccess:()=>{
    toast.success("User Created");
      handleModal();
  }})
  const [modalOpen, setModalOpen] = useState(false)

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
    {
      header: "Status",
      dataIdentifier: "isActive",
      renderCell: (row) => {
        return <TableChip text={row.isActive ? "Active" : "Inactive"}  bgColor={row.isActive ? 'green' : 'red'}/>
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
      email: "",
      IsActive :0,
      role : 0
    },
 //   validationSchema: validation,
    validateOnMount: true,
    onSubmit: (vals) => {
        vals.id === 0 ? createNewUser(vals) : null
    },
  });

  return <>
      <FormModal
        isOpen={modalOpen}
        handleModal={handleModal}
        modalTitle={`${values.id === 0 ? "Create" : "Edit"} User`}
        disabled={!isValid}
        submit={submitForm}
        loading={isLoading}
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
