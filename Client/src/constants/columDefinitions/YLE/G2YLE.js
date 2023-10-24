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
        header: "Star Assessment",
        dataIdentifier: "StarAssessment",
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
        header: "Class Total",
        dataIdentifier: "ClassTotal",
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