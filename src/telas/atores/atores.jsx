import React from "react";
import { tmdb } from "../../api/tmdb";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinners from "../../components/spinners/spinners";
import BackBtn from "../../components/backBtn/backBtn";
import atorImg from "../../assets/img/ator.png";

export default function Atores() {
  const { id } = useParams();
  
  const [load, setLoad] = useState(true);

  const [personagem, setPersonagem] = useState([]);

  useEffect(() => {
    async function loadPersonagem() {
      // const res = await api.get(`/movie/${id}/watch/providers`);
      const elen = await tmdb.get(`/person/${id}`);
      //   const response = await api.get(`/movie/${id}`);
      //   setFilme(response.data);
      // setStremers(res.data.results)
      setPersonagem(elen.data);
      setLoad(false);
      console.log(elen, "personagem");
      // console.log(res, 'onde assistir');
    }

    loadPersonagem();
  }, [id]);
  if (!personagem) {
    return (
      <div>
        <Spinners />
      </div>
    );
  }
  return (
    <main className="bg-dark text-light min-vh-100 p-4">
      {load ? (
        <div className="vw-100 vh-100 mx-auto bg-dark   ">
          <Spinners />
        </div>
      ) : (
        <>
          <BackBtn props={"←Voltar"} />

          <div className="row mt-4">
            <div className="col-md-4">
              <img
                className="w-75 rounded"
                src={
                  personagem.profile_path
                    ? `https://image.tmdb.org/t/p/w500${personagem.profile_path}`
                    : atorImg
                }
              />
            </div>

            <div className="col-md-8">
              <div className="d-flex align-content-center justify-content-between col-12 col-lg-12 my-5">
                <h2>{personagem.also_known_as?.[0]} </h2>
                <p className="text-light">
                  <strong>Nascido:</strong>{" "}
                  {personagem?.birthday
                    ? new Date(personagem.birthday).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "Data não disponivel"}
                </p>
                <p className="text-light">{personagem?.deathday || ""}</p>
              </div>
              <p className="text-light">
                {personagem?.biography || "Biografia não disponível"}
              </p>

              <p className="text-light">
                Pais de origem: <strong>{personagem.place_of_birth}</strong>
              </p>

              {/* <p>{filme.overview}</p>

              <p>
                ⭐ Nota: <strong>{filme.vote_average}</strong>
              </p>

              <div>
                {filme.genres.map((g) => (
                  <span key={g.id} className="badge bg-primary me-2">
                    {g.name}
                  </span>
                ))}
              </div>

              <h3 className="mt-5">Elenco :</h3>
              <div className="row  gap-5 my-3 mx-auto align-content-center">
                {elenco.data.cast.slice(0, limit).map((item) => (
                  <div
                    className=" cardSinope col-4 col-lg-2 "
                    key={item.cast_id}
                    onClick={() => navigate(`/ator/${item.id}`)}
                  >
                    <img
                      className="imgPersonagens col-12 rounded-4 d-block mx-auto"
                      src={
                        item.profile_path
                          ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                          : atorImg
                      }
                      alt={item.name}
                    />
                    <br />
                    <p className="  badge">
                      {item.name} <br />
                      <br /> Como : {item.character}
                    </p>
                  </div>
                ))}
                <div className="d-flex justify-content-around">
                  {limit < elenco.data.cast.length && (
                    <button
                      className="btn btn-link"
                      onClick={() => setLimit(limit + 10)}
                    >
                      Ver mais
                    </button>
                  )}
                  {limit > 10 && (
                    <button
                      className="btn btn-link link-danger"
                      onClick={() => setLimit(limit - 10)}
                    >
                      Ver menos
                    </button>
                  )}
                </div>
              </div> */}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
