import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Spinners from "../../components/spinners/spinners";
import { mediaType } from "../../components/mediaType/mediaType";
import cartaz from "../../assets/img/cartaz.png";
import { tmdb } from "../../api/tmdb";

export default function CardMidias() {
  const navigate = useNavigate();
  const localizar = useLocation();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [type, setType] = useState("");
  const [load, setLoad] = useState(true);
  const [genero, setGenero] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [nmGenero, setNmGenero] = useState(null);

  useState(() => {
    if (localizar.state) {
      setType(localizar.state.type);
    }
  }, [localizar.state]);
 

  const loadFilmes = async (pagina = 1) => {
    setLoad(true);

    try {
      const endpoint = `/${type}/popular?page=${pagina}`;
      const response = await tmdb.get(endpoint);
      setFilmes(response.data.results);
      setTotalPages(response.data.total_pages);
      setPage(pagina);
 
    } catch (error) {
      console.log("Erro ao carregar dados", error);
    } finally {
      setLoad(false);
    }
  };
  const loadEscolhido = async (id, pagina = 1) => {
    setLoad(true);
    try {
      const endpoit = `/discover/${type}?with_genres=${id}&page=${pagina}`;
      const response = await tmdb.get(endpoit);
      setFilmes(response.data.results);
      setTotalPages(response.data.total_pages);
      setPage(pagina);
 
    } catch (error) {
      console.log("Erro ao carregar filmes por genero", error);
    } finally {
      setLoad(false);
    }
  };

  const loadGeneros = async () => {
    try {
      const endpoint = `/genre/${type}/list`;
      const response = await tmdb.get(endpoint);
      setGenero(response.data.genres);
 
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

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    if (isSearch) {
      loadPesquisa(query, newPage);
    } else if (nmGenero && nmGenero !== "Todos os Filmes") {
      const generoSelecionado = genero.find((g) => g.name === nmGenero);
      loadEscolhido(generoSelecionado.id, newPage);
    } else {
      loadFilmes(newPage);
    }
  };

  const loadPesquisa = async (texto, pagina = 1) => {
    if (!texto.trim()) return;
    setLoad(true);

    try {
      const endpoint = `/search/${type}?query=${texto}&page=${pagina}`;
      const response = await tmdb.get(endpoint);

      setFilmes(response.data.results);
      setTotalPages(response.data.total_pages);
      setPage(pagina);
      setIsSearch(true); 
    } catch (error) {
      console.log("Erro na pesquisa", error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    loadFilmes();
    loadGeneros();
  }, []);

  return (
    <main
      className="bg-dark text-light "
      style={{ minHeight: "100vh", height: "100%" }}
    >
      {load ? (
        <div className="vw-100 vh-100 mx-auto   ">
          <h2 className="py-3  rounded-pill text-center mx-3">
            {type === "tv" ? "Séries" : "Filmes"}
          </h2>

          <Spinners />
        </div>
      ) : (
        <>
          <div
            className={`py-3 col-12 col-md-12  rounded-pill text-center row justify-content-around   mb-5 mx-auto ${type === "tv" ? "bg-success" : "bg-primary"}`}
          >
            <button
              className="btn btn-link text-light col-2"
              onClick={() => navigate("/home")}
            >
              ←Sair
            </button>

            <h2 className="col-3 col-md-6   align-content-center text-center  ">
              {type === "tv" ? "Séries" : "Filmes"}
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
            <div className="col-6 col-md-4">
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  className="form-control    border-secondary small rounded-pill"
                  placeholder={`Pesquisar ${type === "tv" ? "séries" : "filmes"}...`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && loadPesquisa(query)}
                />
                <button
                  className="btn-check disabled"
                  onClick={() => {
                    loadPesquisa(query);
                    setQuery("");
                    setIsSearch(false);
                    setNmGenero(null);
                    loadFilmes(1);
                  }}
                ></button>
              </div>
            </div>
          </div>
          <div className="row gap-5 text-center p-3 ">
            {filmes.length === 0 ? (
              <div>
                <h2>
                  {type === "tv" ? "Nenhuma" : "Nenhum"}{" "}
                  {type === "tv" ? "Serie" : "Filme"} encontrado... :(
                </h2>
              </div>
            ) : (
              <>
                {filmes?.map((item) => (
                  <div
                    key={item.id}
                    className=" imgCards  col-5 col-md-4 col-lg-2 col-xxl-2 m-auto h-50  "
                    onClick={() =>
                      navigate(
                        mediaType === "movie"
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
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : cartaz
                        }
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Ver sinopse"
                      />
                    </div>
                    <h6 className="col-12 mt-4">{item.title || item.name}</h6>
                  </div>
                ))}
              </>
            )}
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination bg-dark rounded px-2 py-1">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link bg-dark text-light border-secondary"
                    onClick={() => handlePageChange(page - 1)}
                  >
                    &laquo;
                  </button>
                </li>

                {[...Array(5)].map((_, index) => {
                  const pageNumber = page + index - 2;
                  if (pageNumber < 1 || pageNumber > totalPages) return null;

                  return (
                    <li
                      key={pageNumber}
                      className={`page-item ${page === pageNumber ? "active" : ""}`}
                    >
                      <button
                        className={`page-link ${
                          page === pageNumber
                            ? "bg-primary text-light border-primary"
                            : "bg-dark text-light border-secondary"
                        }`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  );
                })}

                <li
                  className={`page-item ${page === totalPages ? "disabled" : ""}`}
                >
                  <button
                    className="page-link bg-dark text-light border-secondary"
                    onClick={() => handlePageChange(page + 1)}
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </main>
  );
}
