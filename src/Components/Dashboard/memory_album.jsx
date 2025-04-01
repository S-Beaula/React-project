import React from "react";

const MemoryAlbum = () => {
  return (
    <div className="w-full h-screen p-4 flex flex-col items-center justify-center bg-black text-white" >
      <h2 className="text-xl font-bold text-center mb-8">Album of Memories</h2>
      <div className="flex flex-wrap justify-center gap-6" style={{width:"50vw",height:"80vh",marginLeft:"30%"}}>
        {["Friends", "Couple", "Family", "Child", "Pet", "Individual", "Work", "Class", "Team", "Hobby", "Others"].map((album, index) => (
          <button
            key={index}
            className="p-4 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-violet-500 text-black shadow-lg flex items-center justify-between w-40 h-20"
          >
            <span>{album}</span>
            <span className="text-lg">➕</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryAlbum;

