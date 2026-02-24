import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Spinners from "../../components/spinners/spinners";
import BackBtn from "../../components/backBtn/backBtn";
import { tmdb } from "../../api/tmdb";

export default function CardMidias() {
  const navigate = useNavigate();
  const localizar = useLocation();
  
  const [type, setType] = useState(0);
  const [load, setLoad] = useState(true);
  const [genero, setGenero] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [nmGenero, setNmGenero] = useState(null);

  useState(() => {
    if (localizar.state?.type !== undefined) {
      setType(localizar.state.type);
    }
  }, [localizar.state]);

  const loadFilmes = async () => {
    setLoad(true);

    try {
      const endpoint = type === 0 ? "/tv/popular" : "/movie/popular";
      const response = await tmdb.get(endpoint);
      setFilmes(response.data.results);
      console.log("achando series", response);
    } catch (error) {
      console.log("Erro ao carregar filmes", error);
    } finally {
      setLoad(false);
    }
  };
  const loadEscolhido = async (id) => {
    setLoad(true);
    try {
      const endpoit =
        type === 0
          ? `/discover/tv?with_genres=${id}`
          : `/discover/movie?with_genres=${id}`;
      const response = await tmdb.get(endpoit);
      setFilmes(response.data.results);
      console.log(response.data.results, "filmes");
    } catch (error) {
      console.log("Erro ao carregar filmes por genero", error);
    } finally {
      setLoad(false);
    }
  };

  const loadGeneros = async () => {
    try {
      const endpoint = type === 0 ? "/genre/tv/list" : "/genre/movie/list";
      const response = await tmdb.get(endpoint);
      setGenero(response.data.genres);
      console.log(response.data.genres, "generos");
    } catch (error) {
      console.log("Erro ao carregar gêneros", error);
    }
  };

  const handleGenero = async (id, name) => {
    setLoad(true);

    try {
      if (id === "all") {
        await loadFilmes();
      } else {
        await loadEscolhido(id);
        setNmGenero(name);
      }
    } catch (erro) {
      console.log(erro, "deu erro");
    } finally {
      setLoad(false);
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
            {type === 0 ? "Séries" : "Filmes"}
          </h2>

          <Spinners />
        </div>
      ) : (
        <>
          <div
            className={`py-3 col-12 col-md-12  rounded-pill text-center row justify-content-around   mb-5 mx-auto ${type === 0 ? "bg-success" : "bg-primary"}`}
          >
            <button
              className="btn btn-link text-light col-2"
              onClick={() => navigate("/home")}
            >
              ←Sair
            </button>
            <h2 className="col-3 col-md-6   align-content-center text-center  ">
              {type === 0 ? "Séries" : "Filmes"}
            </h2>

            <button
              className="btn  text-light col-4 col-md-2 "
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              {nmGenero || "Categorias"}
            </button>

            <div
              className="offcanvas offcanvas-end bg-dark text-light"
              tabIndex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title  " id="offcanvasRightLabel">
                  Generos de Filmes
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body bg-dark text-light">
                <button
                  data-bs-dismiss="offcanvas"
                  className="btn text-light"
                  value={"all"}
                  onClick={() => handleGenero("all", "Todos os Filmes")}
                >
                  Todos os Filmes
                </button>
                {genero?.map((item) => (
                  <div
                    className="col-sm-12"
                    key={item.id}
                    style={{ cursor: "pointer" }}
                  >
                    <button
                      className="btn text-light "
                      value={item.id}
                      onClick={() => handleGenero(item.id, item.name)}
                      data-bs-dismiss="offcanvas"
                    >
                      {item.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row gap-5 text-center p-3 ">
            {filmes?.map((item) => (
              <div
                key={item.id}
                className=" imgCards  col-5 col-md-4 col-lg-2 col-xxl-2 m-auto h-50  "
                onClick={() =>
                  navigate(
                    type === 0
                      ? `/filme/${item.id}`
                      : `/tv/${item.id} `,
                        {
                          state: {
                            type: type,
                          },
                        },
                  )
                }
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
                <h6 className="col-12 mt-4">{item.title || item.name}</h6>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
