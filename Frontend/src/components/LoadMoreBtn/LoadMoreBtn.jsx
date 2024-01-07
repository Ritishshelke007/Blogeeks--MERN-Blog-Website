import React from "react";

const LoadMoreBtn = ({ state, fetchDataFun }) => {
  if (state != null && state.totalDocs > state.results.length) {
    return (
      <button
        onClick={() => fetchDataFun({ page: state.page + 1 })}
        className=" btn-dark px-3 p-2 hover:bg-black/90 rounded-md flex items-center gap-2 "
      >
        Load More
      </button>
    );
  }
};

export default LoadMoreBtn;
