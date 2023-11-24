import React, { useEffect, useState } from "react";
import Datagrid from "../../components/datagrid/DataGrid";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getGradesCourses, createGradeCourse, updateGradeCourse } from "../../api/AdminAPI";
import FormModal from "../../components/common/modals/FormModal";
import AddEdit from "../gradesCourse/components/AddEdit";
import { useFormik } from "formik";
import validation from "./validations/validation";
import { EditIcon } from "../../components/common/icons/Icons";
import {toast} from 'react-toastify'

const initialFormState = {
  id: 0,
  gradeId : 0,
  courseId :0
};

function GradesCourse() {
  const queryClient = useQueryClient();
  const { data = [], isFetching } = useQuery(["gradesCourses"], getGradesCourses);
  const { mutate: createGradeCourseMutation } = useMutation(createGradeCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries("gradesCourses");
      toast.success("Grade and Course Saved")
      handleModal();
    },
  });
  const { mutate: updateGradeCourseMutation } = useMutation(updateGradeCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries("gradesCourses");
      toast.success("Grade and Course Updated")
      handleModal();
    },
  });
  const [modalOpen, setModalOpen] = useState(false);

  const { values, handleChange, isValid, errors, setValues, submitForm } =
    useFormik({
      initialValues: {
        id: 0,
        gradeId : 0,
        courseId :0
      },
      validationSchema: validation,
      validateOnMount: true,
      onSubmit: (vals) => {
        vals.id === 0 ? createGradeCourseMutation(vals) : updateGradeCourseMutation(vals);
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
            <button onClick={() => handleEdit(row)}><EditIcon/>Edit</button>
          </>
        );
      },
    },
    {
      header: "Grade Name",
      dataIdentifier: "gradeName",
    },
    {
      header: "Course Name",
      dataIdentifier: "courseName",
    },
  ];
  return (
    <>
      <FormModal
        isOpen={modalOpen}
        handleModal={handleModal}
        modalTitle={`${values.id === 0 ? "Create" : "Edit"} Grade-Course`}
        disabled={!isValid}
        submit={submitForm}
      >
        <AddEdit values={values} handleChange={handleChange} errors={errors} />
      </FormModal>
      <Datagrid columns={columns} data={data} actions={[{actionLabel:"Create GradeCourse", actionFunc:handleCreate}]}  loading={isFetching} />;
    </>
  );
}

export default GradesCourse;
