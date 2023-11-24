import React, { useState } from "react";
import DataGrid from "../../components/datagrid/DataGrid";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getClasses, createClass, updateClass } from "../../api/classesAPI";
import FormModal from "../../components/common/modals/FormModal";
import { EditIcon } from "../../components/common/icons/Icons";
import { useFormik } from "formik";
import validation from "../classes/validations/validation";
import AddEdit from "./components/AddEdit";
import {toast} from 'react-toastify'
const initialFormState = {
  id: 0,
  name: "",
  gradeCourseId: 0,
  levelId: 0,
};

function Classes() {
  const queryClient = useQueryClient();
  const { data = [], isFetching } = useQuery(["classes"], getClasses);
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate: createClassMutation } = useMutation(createClass, {
    onSuccess: () => {
      queryClient.invalidateQueries("classes");
      toast.success('Class Created')
      handleModal();
    },
  });
  const { mutate: updateClassMutation } = useMutation(updateClass, {
    onSuccess: () => {
      queryClient.invalidateQueries("classes");
      toast.success('Class Updated')
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
        vals.id === 0 ? createClassMutation(vals) : updateClassMutation(vals);
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
      header: "Name",
      dataIdentifier: "name",
    },
    {
      header: "Grade",
      dataIdentifier: "gradeName",
    },
    {
      header: "Course",
      dataIdentifier: "courseName",
    },
    {
      header: "Level",
      dataIdentifier: "levelName",
    },
    {
      header: "Start Date",
      renderCell: ({ startDate }) => {
        return startDate ? new Date(startDate).toDateString() : "Pending";
      },
    },
    {
      header: "End Date",
      renderCell: ({ endDate }) => {
        if (endDate) {
          return new Date(endDate).toDateString();
        }
        return "Pending";
      },
    },
  ];
  return (
    <>
      <>
        <FormModal
          isOpen={modalOpen}
          handleModal={handleModal}
          modalTitle={`${values.id === 0 ? "Create" : "Edit"} Class`}
          disabled={!isValid}
          submit={submitForm}
        >
          <AddEdit
            values={values}
            handleChange={handleChange}
            errors={errors}
          />
        </FormModal>
        <DataGrid
          actions={[{actionLabel:"Create Class", actionFunc:handleCreate}]}
          columns={columns}
          data={data}
          loading={isFetching}
        />
      </>
    </>
  );
}

export default Classes;
