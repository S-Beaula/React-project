import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSelection = (option) => {
    if (option === "memory_album") {
      navigate("/memory-album");
    } else if (option === "event_album") {
      navigate("/event-album");
    } else {
      console.log(`Selected: ${option}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        What type of album do you want to create?
      </h1>
      <p className="text-blue-400 mb-8 cursor-pointer text-center">Which album suits you? ➕</p>
      
      <div className="flex flex-col gap-5 w-full max-w-md"  style={{width: "400px",gap:"20px",marginLeft:"35%"}}>
        <button
          onClick={() => handleSelection("memory_album")}
          className="w-full flex items-center p-5 bg-purple-600 rounded-xl hover:bg-purple-500 transition shadow-lg"style={{width:"400px",borderRadius:"50px"}}
        >
          <span className="mr-3">📷</span>
          <div>
            <p className="font-semibold text-lg">Create memory album</p>
            <p className="text-sm text-gray-200">Partner, family, friends, pet, son/daughter...</p>
          </div>
        </button>

        <button
          onClick={() => handleSelection("event_album")}
          className="w-full flex items-center p-5 bg-blue-600 rounded-xl hover:bg-blue-500 transition shadow-lg"style={{width:"400px",borderRadius:"50px"}}
        >
          <span className="mr-3">🎉</span>
          <div>
            <p className="font-semibold text-lg">Create event album</p>
            <p className="text-sm text-gray-200">Weddings, birthdays, celebrations...</p>
          </div>
        </button>

        <button
          onClick={() => handleSelection("join_album")}
          className="w-full flex items-center p-5 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition shadow-lg"style={{width:"400px",borderRadius:"50px"}}
        >
          <span className="mr-3">🔗</span>
          <div>
            <p className="font-semibold text-lg">I want to join an album</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
