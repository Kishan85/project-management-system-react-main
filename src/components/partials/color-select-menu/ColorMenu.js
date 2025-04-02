import React from "react";

export const ColorOptions = ({value,label }) => {

  return (
    <div className="d-flex">
      <span className={`dot dot-${value} m-1`}></span>
      {label}
    </div>
  );
};

export const PriorityColorOptions = ({ color_name,label }) => {

  return (
    <div className="d-flex">
      <span className={`dot dot-${color_name} m-1`}></span>
      {label}
    </div>
  );
};
