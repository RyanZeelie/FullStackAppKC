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
        header: "FUN Exam",
        dataIdentifier: "FUNExam",
    },
    {
      header: "Exam",
      dataIdentifier: "Exam",
    },
    {
      header: "Task",
      dataIdentifier: "Task",
    },
    {
        header: "Performance",
        dataIdentifier: "Performance",
    },
    {
      header: "Total",
      renderCell: (row) => {
        return "100";
      },
    },
    {
      header: "LetterScore",
      renderCell: (row) => {
        return "F";
      },
    },
  ];