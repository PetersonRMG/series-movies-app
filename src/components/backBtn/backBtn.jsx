import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackBtn({
  labelBack,
  labelSecond,
  secoundRoute,
  secondState,
}) {
  const navigate = useNavigate();
  return (
    <div className="col-sm-2 text-start row justify-content-between">
      <button
        className="btn btn-link text-light col-5 "
        onClick={() => navigate(-1)}
      >
        {labelBack}
      </button>
      {labelSecond && (
        <button
          className="btn btn-link text-light col-5"
          onClick={() =>
            navigate(secoundRoute, {
              state: {
                type: { secondState },
              },
            })
          }
        >
          {labelSecond}
        </button>
      )}
    </div>
  );
}
