import React from "react";

const EventAlbum = () => {
  return (
 
    <div className="w-full max-w-lg p-4 flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
          <h2 className="text-xl font-bold text-center mb-4 ">Event Albums</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Wedding", "Birthday", "Festival", "Anniversary", "Conference", "Concert", "Trip", "Graduation", "Competition", "Reunion", "Others"].map((event, index) => (
              <button 
                key={index} 
                
                className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-black shadow-lg flex items-center justify-between w-40 h-20"
              >
                <span>{event}</span>
                <span className="text-lg">➕</span>
              </button>
            ))}
          </div>
        </div>
  );
};

export default EventAlbum;
