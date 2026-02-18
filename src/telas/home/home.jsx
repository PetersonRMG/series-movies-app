import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import BackBtn from "../../components/backBtn/backBtn";
import { tmdb } from "../../api/tmdb";

export default function Home() {
  const navigate = useNavigate();
  // console.log("TOKEN:", import.meta.env.VITE_TMDB_TOKEN, 'teste');

  useEffect(() => {
    tmdb
      .get("/genre/movie/list")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <main className="container-fluid bg-home col-sm-12 text-light w-100 vh-100 d-grid justify-content-center align-items-center">
      <div className="">
        <h1 className="text-center">
          {" "}
          Bem- Vindo ao <br />
          App Series e Filme
        </h1>
        <div className="row justify-content-between  ">
          <div
            className="cards bg-serie col-5   border-0 rounded align-content-center text-center"
            onClick={() => navigate("/series")}
          >
            
          </div>
          <div
            className="cards col-5 bg-filme border-0 rounded align-content-center text-center"
            onClick={() => navigate("/filmes")}
          >
            
          </div>
          <div className="text-center ">
            <BackBtn props={"←Voltar"} />
          </div>
        </div>
      </div>
    </main>
  );
}
