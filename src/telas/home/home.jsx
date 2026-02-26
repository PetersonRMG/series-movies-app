
import { useNavigate } from "react-router-dom";
import React from "react";
import BackBtn from "../../components/backBtn/backBtn";
import { mediaType } from "../../components/mediaType/mediaType";


export default function Home() {
  const navigate = useNavigate();
 


  return (
    <main className="container-fluid bg-home col-sm-12 text-light w-100 vh-100 d-grid justify-content-center align-items-center">
      <div className="">
        <h1 className="text-center">
          {" "}
          Bem- Vindo ao <br />
          App Series e Filme
        </h1>
        <div className="row justify-content-between  ">
          {/* series */}

          <div
            className="cards bg-serie col-5   border-0 rounded align-content-center text-center"
            onClick={() =>
              navigate("/cardMidias", {
                state: {
                  type: mediaType.TV,
                },
              })
            }
          ></div>
          {/* filmess */}
          <div
            className="cards col-5 bg-filme border-0 rounded align-content-center text-center"
            onClick={() =>
              navigate("/cardMidias", {
                state: {
                  type: mediaType.MOVIE,
                },
              })
            }
          ></div>
          <button
            className="btn btn-link text-light col-5 "
            onClick={() => navigate("/")}
          >
            ←Voltar
          </button>
        </div>
      </div>
    </main>
  );
}
