import React from "react";

const Loading = () => {
  return (
    <div className="absolute flex items-center justify-center w-screen h-screen z-10 bg-black/50 top-0 left-0">
      <h1 className="text-2xl text-white font-bold">
        Fetching latest Data....
      </h1>
    </div>
  );
};

export default Loading;
