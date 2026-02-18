import React from "react";  
import { useNavigate } from "react-router-dom";

export default function BackBtn({props}){
    const navigate = useNavigate();
    return (
      <button className="btn btn-link text-light col-2" onClick={() => navigate(-1)}>
        {props}
      </button>
    );
}