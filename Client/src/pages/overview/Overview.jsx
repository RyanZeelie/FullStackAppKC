import React, { useEffect, useMemo, useState } from "react";
import DataGrid from "../../components/datagrid/DataGrid";
import Accordion from "../../components/common/accordion/ManagedAccordion";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { getClassOverview } from "../../api/managementAPI";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { endClass, startClass } from "../../api/classesAPI";

export default function Overview() {
  const [accordianStates, setAccordianState] = useState({});

  const handleAccordion = (classId) => {
    console.log(accordianStates);
    setAccordianState((prevState) => ({
      ...prevState,
      [classId]: prevState[classId] ? !prevState[classId] : true,
    }));
  };

  useEffect(() => {
    console.log(accordianStates);
  }, [accordianStates]);

  const queryClient = new useQueryClient();
  const { gradeId } = useParams();
  const { data = [] } = useQuery(
    ["classOverview", { gradeId }],
    getClassOverview
  );

  const { mutate: startClassMutation } = useMutation(startClass, {
    onSuccess: () => {
      queryClient.invalidateQueries("classOverview");
    },
  });
  const { mutate: endClassMutation } = useMutation(endClass, {
    onSuccess: () => {
      queryClient.invalidateQueries("classOverview");
    },
  });
  const columns = [
    {
      header: "Name",
      dataIdentifier: "englishName",
    },
    {
      header: "Chinese Name",
      dataIdentifier: "chineseName",
    },
    {
      header: "Listening",
      dataIdentifier: "listening",
    },
    {
      header: "Reading/Writing",
      dataIdentifier: "reading_Writing",
    },
    {
      header: "Total",
      dataIdentifier: "total",
    },
    {
      header: "Test Taken",
      renderCell: (row) => {
        return row.testTaken ? "Yea" : "Nah";
      },
    },
    {
      header: "Recommnedation",
      renderCell: (row) => {
        return <textarea value={row.recommendation} onChange={() => {}} />;
      },
    },
    {
      header: "Book",
      dataIdentifier: "book",
    },
  ];
  let getNoticeMessage = (startDate, endDate) => {
    let message = "";
    if (startDate && endDate === null) {
      if (startDate <= new Date().toDateString() && endDate === null) {
        message = "Class in progress";
      }
    } 
    else if(startDate === null) {
      message = "Class has not started";
    }
    else if(startDate && endDate){
      message = "Class has finished";
    }
    return message;
  };

  return data?.classes?.map(({ classDetails, students }) => {
    return (
      <Accordion
        key={uuidv4()}
        title={classDetails.name}
        toggleAccordion={() => handleAccordion(classDetails.id)}
        state={accordianStates[classDetails.id]}
      >
        <div className="bg-orange-300 p-4 rounded-md text-white mb-5">
          {getNoticeMessage(classDetails.startDate, classDetails.endDate)}
        </div>
        <DataGrid
          columns={columns}
          data={students}
          action={() =>
            classDetails.startDate
              ? endClassMutation(classDetails.id)
              : startClassMutation(classDetails.id)
          }
          actionLabel={classDetails.startDate ? "End Class" : "Start Class"}
        />
      </Accordion>
    );
  });
}
