import React, { useState } from "react";
import Datagrid from "../../components/datagrid/DataGrid";
import { useQuery } from "react-query";
import { getGrades } from "../../api/gradesAPI";
import FormModal from "../../components/common/modals/FormModal";
import AddEdit from "../grades/components/AddEdit";
import { useFormik } from "formik";
import validation from "./validations/validation";
function Grades() {
  const { data = [] } = useQuery(["grades"], getGrades);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };
  const { values, handleChange, isValid, errors } = useFormik({
    initialValues: {
      id: 0,
      Name: "",
    },
    validationSchema: validation,
  });

  const columns = [
    {
      header: "Actions",
      renderCell: () => {
        return "actions";
      },
    },
    {
      header: "Name",
      dataIdentifier: "name",
    },
  ];
  return (
    <>
      <FormModal
        isOpen={modalOpen}
        handleModal={handleModal}
        modalTitle={"Add/Edit Grade"}
        disabled={!isValid}
      >
        <AddEdit values={values} handleChange={handleChange} errors={errors} />
      </FormModal>
      <Datagrid columns={columns} data={data.data} action={handleModal} />;
    </>
  );
}

export default Grades;
