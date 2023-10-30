import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {getDashboarData} from '../../api/managementAPI'
import { v4 as uuidv4 } from "uuid";
function Dashboard() {
  const {data = [], isFetching} = useQuery(['dashboard'], getDashboarData)
  return (
    <>
    {isFetching ? <p>Loading</p> : data.dashboardCards.map(gradeOverview=>{
      return <Link key={uuidv4()} to={`/overview/${gradeOverview.gradeCourseId}`}>
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-4 bg-white">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{`${gradeOverview.gradeName} - ${gradeOverview.courseName}`}</div>
          <p className="text-gray-700 text-base p-1">{`Total Students: ${gradeOverview.studentCount}` }</p>
          <p className="text-gray-700 text-base p-1">{`Total Classes: ${gradeOverview.classCount}` }</p>
          <p className="text-gray-700 text-base p-1">Average Score: TODO</p>
        </div>
      </div>
    </Link>
    })}
      
    </>
  );
}

export default Dashboard;
