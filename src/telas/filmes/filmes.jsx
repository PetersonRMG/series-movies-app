import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Spinners from "../../components/spinners/spinners";
import BackBtn from "../../components/backBtn/backBtn";
import { tmdb } from "../../api/tmdb";

export default function Filmes() {
  const navigate = useNavigate();

  const [load, setLoad] = useState(true);
  const [genero, setGenero] = useState([]);
  const [filmes, setFilmes] = useState([]);

  const loadFilmes = async () => {
    setLoad(true);
    try {
      const response = await tmdb.get("/movie/popular");
      setFilmes(response.data.results);
    } catch (error) {
      console.log("Erro ao carregar filmes", error);
    } finally {
      setLoad(false);
    }
  };
  const loadEscolhido = async (id) => {
    setLoad(true);
    try {
      const response = await tmdb.get(`/discover/movie?with_genres=${id}`);
      setFilmes(response.data.results);
    } catch (error) {
      console.log("Erro ao carregar filmes por genero", error);
    } finally {
      setLoad(false);
    }
  };

  const loadGeneros = async () => {
    try {
      const response = await tmdb.get("/genre/movie/list");
      setGenero(response.data.genres);
    } catch (error) {
      console.log("Erro ao carregar gêneros", error);
    }
  };

  const handleGenero = (e) => {
    const idGenero = e.target.value;

    if (idGenero === "all") {
      loadFilmes();
    } else {
      loadEscolhido(idGenero);
    }
  };

  useEffect(() => {
    loadFilmes();
    loadGeneros();
  }, []);

  return (
    <main className="bg-dark text-light ">
      {load ? (
        <div className="vw-100 vh-100 mx-auto   ">
          <h2 className="py-3 bg-primary rounded-pill text-center mx-3">
            Filmes
          </h2>

          <Spinners />
        </div>
      ) : (
        <>
          <div className="py-3 col-12 bg-primary rounded-pill text-center row justify-content-around mb-5 mx-auto">
            <BackBtn props={"←Voltar"} />
            <h2 className="col-3 col-md-6 ms-3 align-content-center">Filmes</h2>
            <select
              className=" form-select form-select-sm w-25 rounded-pill mx-5  border-0 "
              onChange={handleGenero}
            >
              <option value="all">Todos os Filmes</option>
              {genero?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="row gap-5 text-center p-3 ">
            {filmes?.map((item) => (
              <div
                key={item.id}
                className=" imgCards  col-5 col-md-4 col-lg-2 col-xxl-2 m-auto h-50  "
                onClick={() => navigate(`/filme/${item.id}`)}
              >
                <div>
                  <img
                    className="w-100 rounded cardFilmes"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Ver sinopse"
                  />
                </div>
                <h6 className="col-12 mt-4">{item.title}</h6>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
