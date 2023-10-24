import React from "react";
import DataGrid from "../../components/datagrid/DataGrid";
import Accordion from "../../components/common/accordion/Accordion";

const tempData = [
  {
    ClassName: "Oak",
    data: [
      {
        EnglishName: "Dave",
        ChineseName: "SomeChineseName",
        Class: "",
        Listening: 10,
        Reading_Writing: 20,
        TestTaken: true,
        Recommnedation: "Some Recommedation",
        Book: "SomeBook",
      },
    ],
  },
];

export default function Overview() {
  const columns = [
    {
      header: "Name",
      dataIdentifier: "EnglishName",
    },
    {
      header: "Chinese Name",
      dataIdentifier: "ChineseName",
    },
    {
      header: "Class",
      dataIdentifier: "Class",
    },
    {
      header: "Listening",
      dataIdentifier: "Listening",
    },
    {
      header: "Reading/Writing",
      dataIdentifier: "Reading_Writing",
    },
    {
      header: "Total",
      renderCell: (row) => {
        return row.Listening + row.Reading_Writing;
      },
    },
    {
      header: "TestTaken",
      renderCell: (row) => {
        return row.TestTaken ? "Yea" : "Nah";
      },
    },
    {
      header: "Recommnedation",
      renderCell: (row) => {
        return <textarea value={row.Recommnedation} />;
      },
    },
    {
      header: "Book",
      dataIdentifier: "Book",
    },
  ];
  
  return (
    <>
      {tempData.map((classData) => {
        return (
          <Accordion title={classData.ClassName}>
            <DataGrid columns={columns} data={classData.data} />
          </Accordion>
        );
      })}
    </>
  );
}
