import React from "react";
import Datagrid from "../../components/datagrid/DataGrid";
import { useQuery } from "react-query";
import { getStudents } from "../../api/gradesAPI";

function Students() {
  const { data = [] } = useQuery(["students"], getStudents);
  const columns = [
    {
      header: "Actions",
      renderCell: () => {
        return "actions";
      },
    },
    {
      header: "Name",
      dataIdentifier: "EnglishName",
    },
    {
      header: "Surname",
      dataIdentifier: "Surname",
    },
    {
        header: "ChineseName",
        dataIdentifier: "ChineseName",
      },
  ];
  return <Datagrid columns={columns} data={data.data} />;
}

export default Students;
