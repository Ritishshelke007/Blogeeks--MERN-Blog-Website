import React from "react";

const NoDataMessage = ({ message }) => {
  return (
    <div className="text-center w-full p-4 bg-grey/50">
      <p> {message} </p>
    </div>
  );
};

export default NoDataMessage;
