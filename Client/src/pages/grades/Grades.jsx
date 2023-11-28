import React, { useEffect, useState } from "react";
import Datagrid from "../../components/datagrid/DataGrid";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getGrades, createGrade, updateGrade } from "../../api/AdminAPI";
import FormModal from "../../components/common/modals/FormModal";
import AddEdit from "../grades/components/AddEdit";
import { useFormik } from "formik";
import validation from "./validations/validation";
import { EditIcon } from "../../components/common/icons/Icons";
import { toast } from "react-toastify";
import ToolTip from '../../components/common/tooltip/ToolTipWrapper'

const initialFormState = {
  id: 0,
  name: "",
};

function Grades() {
  const queryClient = useQueryClient();
  const { data = [], isFetching } = useQuery(["grades"], getGrades);
  const { mutate: createGradeMutation } = useMutation(createGrade, {
    onSuccess: () => {
      queryClient.invalidateQueries("grades");
      toast.success("Grade Updated");
      handleModal();
    },
  });
  const { mutate: updateGradeMutation } = useMutation(updateGrade, {
    onSuccess: () => {
      queryClient.invalidateQueries("grades");
      toast.success("Grade Updated");
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
        vals.id === 0 ? createGradeMutation(vals) : updateGradeMutation(vals);
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
      header: "Grade Name",
      dataIdentifier: "name",
    },
  ];
  return (
    <>
      <FormModal
        isOpen={modalOpen}
        handleModal={handleModal}
        modalTitle={`${values.id === 0 ? "Create" : "Edit"} Grade`}
        disabled={!isValid}
        submit={submitForm}
      >
        <AddEdit values={values} handleChange={handleChange} errors={errors} />
      </FormModal>
      <Datagrid
        columns={columns}
        data={data}
        actions={[{ actionLabel: "Create Grade", actionFunc: handleCreate }]}
        loading={isFetching}
      />
      ;
    </>
  );
}

export default Grades;
