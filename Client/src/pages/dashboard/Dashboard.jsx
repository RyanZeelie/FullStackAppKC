import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
    <Link to={"/overview/2"}>
      <div class="max-w-sm rounded-lg overflow-hidden shadow-lg m-4 bg-white">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Grade Name</div>
          <p class="text-gray-700 text-base">Number of Students: 30</p>
          <p class="text-gray-700 text-base">Average Score: 85%</p>
        </div>
      </div>
      </Link>
    </>
  );
}

export default Dashboard;
