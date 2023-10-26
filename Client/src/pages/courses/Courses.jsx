import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createCourse, getCourses, updateCourse } from "../../api/AdminAPI";
import FormModal from "../../components/common/modals/FormModal";
import DataGrid from "../../components/datagrid/DataGrid";
import { useFormik } from "formik";
import AddEdit from "./components/AddEdit";
import { EditIcon } from "../../components/common/icons/Icons";
import validation from "./validations/validation";
import {toast} from 'react-toastify'
const initialFormState = {
  id: 0,
  name: "",
};

function Courses() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const { data = [], isFetching } = useQuery(["courses"], getCourses);
  const { mutate: createCourseMutation } = useMutation(createCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries("courses");
      toast.success('Course Created')
      handleModal();
    },
  });
  const { mutate: updateCourseMutation } = useMutation(updateCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries("courses");
      toast.success('Course Updated')
      handleModal();
    },
  });
  const { values, setValues, handleChange, isValid, submitForm, errors } =
    useFormik({
      initialValues: {
        id: 0,
        name: "",
      },
      validationSchema: validation,
      validateOnMount: true,
      onSubmit: (vals) => {
        vals.id === 0 ? createCourseMutation(vals) : updateCourseMutation(vals);
      },
    });

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };
  const handleCreate = () => {
    setValues(initialFormState);
    handleModal();
  };
  const handleEdit = async (selectedRow) => {
    await setValues(selectedRow, true);
    handleModal();
  };
  const columns = [
    {
      header: "Actions",
      renderCell: (row) => {
        return (
          <>
            <button onClick={() => handleEdit(row)}>
              <EditIcon />
              Edit
            </button>
          </>
        );
      },
    },
    {
      header: "Course Name",
      dataIdentifier: "name",
    },
  ];
  return (
    <>
      <FormModal
        isOpen={modalOpen}
        handleModal={handleModal}
        modalTitle={`${values.id === 0 ? "Create" : "Edit"} Course`}
        disabled={!isValid}
        submit={submitForm}
      >
        <AddEdit values={values} handleChange={handleChange} errors={errors} />
      </FormModal>
      <DataGrid
        action={handleCreate}
        columns={columns}
        data={data}
        loading={isFetching}
      />
    </>
  );
}

export default Courses;
