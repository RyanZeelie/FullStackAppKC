import React, { useEffect, useState } from "react";
import Datagrid from "../../components/datagrid/DataGrid";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getLevels, createLevel, updateLevel } from "../../api/AdminAPI";
import FormModal from "../../components/common/modals/FormModal";
import AddEdit from "../levels/components/AddEdit";
import { useFormik } from "formik";
import validation from "./validations/validation";
import { EditIcon } from "../../components/common/icons/Icons";
import {toast} from 'react-toastify'

const initialFormState = {
  id: 0,
  name: "",
  total : 0
};

function Levels() {
  const queryClient = useQueryClient();
  const { data = [], isFetching } = useQuery(["levels"], getLevels);
  const { mutate: createLevelMutation } = useMutation(createLevel, {
    onSuccess: () => {
      queryClient.invalidateQueries("levels");
      toast.success("Level Created")
      handleModal();
    },
  });
  const { mutate: updateLevelMutation } = useMutation(updateLevel, {
    onSuccess: () => {
      queryClient.invalidateQueries("levels");
      toast.success("Level Updated")
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
        vals.id === 0 ? createLevelMutation(vals) : updateLevelMutation(vals);
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
      header: "Level Name",
      dataIdentifier: "name",
    },
    {
      header: "Total Score",
      dataIdentifier: "total",
    },
  ];
  return (
    <>
      <FormModal
        isOpen={modalOpen}
        handleModal={handleModal}
        modalTitle={`${values.id === 0 ? "Create" : "Edit"} Level`}
        disabled={!isValid}
        submit={submitForm}
      >
        <AddEdit values={values} handleChange={handleChange} errors={errors} />
      </FormModal>
      <Datagrid columns={columns} data={data} action={handleCreate} loading={isFetching} />;
    </>
  );
}

export default Levels;
