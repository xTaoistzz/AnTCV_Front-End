import React from "react";
import ProjectApp from "../components/project/allproject";
import Create from "../components/project/create";

const Home: React.FC = () => {
  return (
    <div className=" h-screen m-5 rounded-lg border border-black">
      <div className="p-10">
        <div className="text-center flex justify-between p-5">
          <div className=" text-xl content-center">Project</div>
          <div><button className="border border-black p-3 rounded-md">+ Create Project</button></div>
        </div>
        <div className="border-b border-black mb-7"></div>
        <div className="space-x-2">
          <ProjectApp />
        </div>
      </div>
    </div>
  );
};

export default Home;
