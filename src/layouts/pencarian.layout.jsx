import React from "react";
import SearchComponent from "../components/search";

const PencarianLayout = ({ children }) => {
  return (
    <>
      <div className="d-md-flex mt-4">
        <div className="w-25 px-5 pt-2 ">
          <img src="/kosanku.png" alt="..." />
        </div>
        <div
          className="w-50 pt-2">
          <SearchComponent />
        </div>
        <p className="cursor-pointer my-auto mx-3 fw-semibold text-gray">
          Cancel
        </p>
      </div>
      {children}
    </>
  );
};

export default PencarianLayout;
