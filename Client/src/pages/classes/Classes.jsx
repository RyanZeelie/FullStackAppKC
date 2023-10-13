import React from "react";
import Datagrid from "../../components/datagrid/DataGrid";
import { useQuery } from "react-query";
import { getClasses } from "../../api/gradesAPI";
import FormModal from "../../components/common/modals/FormModal";
function Classes() {
  const { data = [] } = useQuery(["classes"], getClasses);
  const columns = [
    {
      header: "Actions",
      renderCell: () => {
        return "actions";
      },
    },
    {
      header: "Name",
      dataIdentifier: "Name",
    },
    {
      header: "Grade Id",
      dataIdentifier: "GradeId",
    },
    {
      header: "Start Date",
      renderCell: ({ StartDate }) => {
        return new Date(StartDate).toDateString();
      },
    },
    {
      header: "End Date",
      renderCell: ({ EndDate }) => {
        if (EndDate) {
          return new Date(EndDate).toDateString();
        }
        return "Class is Active";
      },
    },
  ];
  return <>
  
  <Datagrid columns={columns} data={data.data} />
  </> 
}

export default Classes;
