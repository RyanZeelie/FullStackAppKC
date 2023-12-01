import React, { useEffect, useMemo, useState } from "react";
import DataGrid from "../../components/datagrid/DataGrid";
import Accordion from "../../components/common/accordion/ManagedAccordion";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { getClassOverview } from "../../api/managementAPI";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { endClass, startClass } from "../../api/classesAPI";
import {
  dropStudentFromClass,
  getStudentsByGrade,
  addStudentsToClass,
  updateScoreCard,
} from "../../api/studentAPI";
import FormModal from "../../components/common/modals/FormModal";
import { useFormik } from "formik";
import ConfirmSemester from "./components/ConfirmSemester";
import StudentListAdd from "./components/StudentListAdd";
import {
  DeleteIcon,
  EditIcon,
  SaveIcon,
} from "../../components/common/icons/Icons";
import Tooltip from "../../components/common/tooltip/ToolTipWrapper";
import Input from "../../components/common/inputs/Input";
import TableInput from "../../components/common/inputs/TableInput";
import Select from "../../components/common/inputs/Select";

export default function Overview() {
  const [accordianStates, setAccordianState] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [addStudentModal, setAddStudentModal] = useState(false);
  const [listOfStudentsToAdd, setListOfstudentsToAdd] = useState([]);
  const [isEdit, setIsEdit] = useState(null);

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
  const { mutate: dropStudent } = useMutation(dropStudentFromClass, {
    onSuccess: () => {
      queryClient.invalidateQueries("classOverview");
    },
  });
  const { mutate: addStudent } = useMutation(addStudentsToClass, {
    onSuccess: () => {
      queryClient.invalidateQueries("classOverview");
    },
  });
  const { mutate: updateScore } = useMutation(updateScoreCard, {
    onSuccess: () => {
      queryClient.invalidateQueries("classOverview");
    },
  });
  const [selectedClass, setSelectedClass] = useState({
    classDetails: {},
    students: [],
    type: "EndClass",
  });
  const handleModal = (data = null) => {
    if (data) {
      setSelectedClass(data);
    } else {
      setSelectedClass({
        classId: 0,
        type: "EndClass",
      });
    }

    setModalOpen(!modalOpen);
  };
  const handleAddStudentModal = (data = null) => {
    if (data) {
      setSelectedClass(data);
    } else {
      setSelectedClass({
        classId: 0,
        type: "EndClass",
      });
    }

    setAddStudentModal(!addStudentModal);
  };
  const handleAddStudentsToClass = (semesterId) => {
    addStudent({
      semesterId: semesterId,
      studentIds: listOfStudentsToAdd,
    });
    handleAddStudentModal();
    setListOfstudentsToAdd([]);
  };
  const handleAccordion = (classId) => {
    console.log(accordianStates);
    setAccordianState((prevState) => ({
      ...prevState,
      [classId]: prevState[classId] ? !prevState[classId] : true,
    }));
  };

  const { values, submitForm, isValid, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        classId: 0,
        semesterNumber: 1,
        studentIds: [],
        gradeId: 0,
      },
      onSubmit: (vals) => {
        selectedClass.type === "EndClass"
          ? endClassMutation({
              ...vals,
              classId: selectedClass.classDetails.id,
            })
          : startClassMutation({
              ...vals,
              classId: selectedClass.classDetails.id,
            });

        setFieldValue("studentIds", []);
        handleModal();
      },
    });

  const queryClient = new useQueryClient();
  const { gradeId } = useParams();
  const { data = [] } = useQuery(
    ["classOverview", { gradeId }],
    getClassOverview
  );

  const handleEditRow = (row) => {
    setIsEdit(row);
  };
  const handleRowValueEdit = ({target}) => {
    let {name,value} = target
    setIsEdit(prev=>(
      {
        ...prev,
        [name] : value
      }
    ))
  }
  const handleSaveRow = () => {
    let {
      scoreId,
      listening,
      reading_Writing,
      isTestTaken,
      recommendation,
      book,
    } = isEdit
    updateScore({
      scoreId,
      listening,
      reading_Writing,
      isTestTaken : isTestTaken === "true" || isTestTaken === true ,
      recommendation,
      book,
    });
    setIsEdit(null);
  };
  const columns = [
    {
      header: "Actions",
      renderCell: (row) => {
        return (
          <div>
            {" "}
            <button className="mr-4" onClick={() => dropStudent(row.scoreId)}>
              <Tooltip text={"Remove Student"}>
                <DeleteIcon />
              </Tooltip>
            </button>
            {isEdit?.scoreId === row.scoreId ? (
              <button onClick={() => handleSaveRow(row)}>
                {" "}
                <Tooltip text={"Save"}>
                  <SaveIcon />
                </Tooltip>
              </button>
            ) : (
              <button onClick={() => handleEditRow(row)}>
                {" "}
                <Tooltip text={"Edit"}>
                  <EditIcon />
                </Tooltip>
              </button>
            )}
          </div>
        );
      },
    },
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
      renderCell: (row) => {
        if (isEdit?.scoreId === row.scoreId) {
          return <TableInput name="listening" value={isEdit?.listening} type="number" onChange={handleRowValueEdit} />;
        }
        return row.listening;
      },
    },
    {
      header: "Reading/Writing",
      renderCell: (row) => {
        if (isEdit?.scoreId === row.scoreId) {
          return <TableInput name="reading_Writing" value={isEdit?.reading_Writing} type="number" onChange={handleRowValueEdit} />;
        }
        return row.reading_Writing;
      },
    },
    {
      header: "Total",
      renderHeader: (row) => {
        return "Total";
      },
      dataIdentifier: "total",
    },
    {
      header: "Test Taken",
      renderCell: (row) => {
        if (isEdit?.scoreId === row.scoreId) {
          return <Select name="isTestTaken" value={isEdit?.isTestTaken}  handleChange={handleRowValueEdit} ><option value={true}>Yes</option><option value={false}>No</option></Select>;
        }
        return row.isTestTaken ? "Yes" : "No";
      }
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
  let getNoticeMessage = (startDate, endDate, semester) => {
    let message = "";
    if (startDate && endDate === null) {
      if (startDate <= new Date().toDateString() && endDate === null) {
        message = `Semester ${semester} in progress`;
      }
    } else if (startDate === null) {
      message = "Class has not started";
    } else if (startDate && endDate) {
      message = "Class has finished";
    }
    return message;
  };

  return (
    <>
      <FormModal
        isOpen={modalOpen}
        handleModal={handleModal}
        modalTitle={`${
          selectedClass.type === "EndClass" ? "End Semester" : "Start Semester"
        }`}
        disabled={!isValid}
        submit={submitForm}
      >
        <ConfirmSemester
          type={selectedClass.type}
          classDetails={selectedClass.classDetails}
          students={selectedClass.students}
          values={values}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
      </FormModal>
      <FormModal
        isOpen={addStudentModal}
        handleModal={handleAddStudentModal}
        modalTitle={`Add Students to current Class`}
        submit={() => {
          handleAddStudentsToClass(selectedClass.semesterId);
        }}
        disabled={listOfStudentsToAdd.length === 0}
      >
        <StudentListAdd
          studentIds={listOfStudentsToAdd}
          setStudentIds={setListOfstudentsToAdd}
          gradeCourseId={selectedClass.gradeCourseId}
        />
      </FormModal>
      {data?.classes?.map(({ classDetails, students }) => {
        return (
          <>
            <Accordion
              key={uuidv4()}
              title={classDetails.name}
              toggleAccordion={() => handleAccordion(classDetails.id)}
              state={accordianStates[classDetails.id]}
            >
              <div className="bg-blue-400 p-4 rounded-md text-white mb-5 border border-gray-400">
                <p className="text-lg mb-2">Class Information</p>
                <p>
                  Status :{" "}
                  {getNoticeMessage(
                    classDetails.startDate,
                    classDetails.endDate,
                    classDetails.semesterNumber
                  )}
                </p>
                <p>Level : {classDetails.levelName}</p>
                <p>Level Total : {classDetails.totalScore}</p>
              </div>
              <DataGrid
                columns={columns}
                data={students}
                actions={[
                  {
                    disabled: false,
                    actionLabel: classDetails.startDate
                      ? "End Semester"
                      : "Start Semester",
                    actionFunc: () =>
                      handleModal({
                        classDetails: classDetails,
                        students: students,
                        type: classDetails.startDate
                          ? "EndClass"
                          : "StartClass",
                      }),
                  },
                  {
                    actionLabel: "Add Student",
                    disabled: classDetails.startDate === null,
                    actionFunc: () =>
                      handleAddStudentModal({
                        gradeCourseId: classDetails.gradeCourseId,
                        semesterId: classDetails.semesterId,
                        students: students,
                        type: "AddStudent",
                      }),
                  },
                ]}
              />
            </Accordion>
          </>
        );
      })}
    </>
  );
}
