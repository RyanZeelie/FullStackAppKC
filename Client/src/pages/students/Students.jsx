import React, { useState } from "react";
import Datagrid from "../../components/datagrid/DataGrid";
import { useMutation, useQuery, useQueryClient } from "react-query";
import FormModal from "../../components/common/modals/FormModal";
import AddEdit from "../students/components/AddEdit";
import { useFormik } from "formik";
import {
  updateStudent,
  getStudents,
  createStudent,
} from "../../api/studentAPI";
import validation from "./validations/validation";
import { EditIcon } from "../../components/common/icons/Icons";
import { toast } from "react-toastify";

const initialFormState = {
  id: 0,
  englishName: "",
  surname: "",
  chineseName: "",
  classId: 0,
};

function Grades() {
  const queryClient = useQueryClient();
  const { data = [], isFetching } = useQuery(["students"], getStudents);
  const { mutate: createStudentMutation } = useMutation(createStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries("students");
      toast.success("student created");
      handleModal();
    },
  });
  const { mutate: updateStudentMutation } = useMutation(updateStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries("students");
      toast.success("student Updated");
      handleModal();
    },
  });
  const [modalOpen, setModalOpen] = useState(false);

  const { values, handleChange, isValid, errors, setValues, submitForm } =
    useFormik({
      initialValues: {
        id: 0,
        name: "",
      },
      validationSchema: validation,
      validateOnMount: true,
      onSubmit: (vals) => {
        vals.id === 0
          ? createStudentMutation(vals)
          : updateStudentMutation(vals);
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
      header: "English Name",
      dataIdentifier: "englishName",
    },
    {
      header: "Surname",
      dataIdentifier: "surname",
    },
    {
      header: "Chinese Name",
      dataIdentifier: "chineseName",
    },
    {
      header: "Class",
      dataIdentifier: "className",
    },
    {
      header: "Grade",
      dataIdentifier: "gradeName",
    },
    {
      header: "Course",
      dataIdentifier: "courseName",
    },
  ];
  return (
    <>
      <FormModal
        isOpen={modalOpen}
        handleModal={handleModal}
        modalTitle={`${values.id === 0 ? "Create" : "Edit"} Student`}
        disabled={!isValid}
        submit={submitForm}
      >
        <AddEdit values={values} handleChange={handleChange} errors={errors} />
      </FormModal>
      <Datagrid
        columns={columns}
        data={data}
        action={handleCreate}
        loading={isFetching}
      />
      ;
    </>
  );
}

export default Grades;
