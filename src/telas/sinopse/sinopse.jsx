import React from "react";
import { tmdb } from "../../api/tmdb";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinners from "../../components/spinners/spinners";
import BackBtn from "../../components/backBtn/backBtn";
import atorImg from "../../assets/img/ator.png";

export default function Sinopse() {
  const [filme, setFilme] = useState(null);
  const [load, setLoad] = useState(true);
  const [limit, setLimit] = useState(10);
  const [trailer, setTrailer] = useState([]);
  // const [stremers, setStremers] = useState([])

  const [elenco, setElenco] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function loadFilme() {
      // const res = await api.get(`/movie/${id}/watch/providers`);
      const elen = await tmdb.get(`/movie/${id}/credits`);
      const response = await tmdb.get(`/movie/${id}`);
      const trai = await tmdb.get(`/movie/${id}/videos?language=pt-BR`);
      setFilme(response.data);
      // setStremers(res.data.results)
      setElenco(elen);
      setTrailer(trai.data.results);
      setLoad(false);
      console.log(trai.data, "achando trailer");
      // console.log(res, 'onde assistir');
    }

    loadFilme();
  }, [id]);

  const videos = trailer.find(
    (video) =>
      video.type === "Trailer" &&
      video.site === "YouTube" &&
      video.official === true,
  );
  if (!filme) {
    return (
      <div className="bg-dark text-light min-vh-100 p-4">
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
                src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
              />
            </div>

            <div className="col-md-8">
              <div className="d-flex align-content-center justify-content-between col-12 col-lg-6">
                <h2>{filme.title} </h2>
                <p className="mt-3 small">
                  <span className="badge bg-success">Diretor</span> -{" "}
                  {elenco.data.crew[0].name}
                </p>
              </div>
              <p className="text-light">
                <strong className="badge bg-warning text-dark ">
                  Lançado:
                </strong>{" "}
                {filme.release_date
                  ? new Date(filme.release_date).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "Data não disponivel"}
              </p>

              <p>{filme.overview}</p>

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
              {videos ? (
                <div className="badge">
                  <a
                    href={`https://www.youtube.com/watch?v=${videos.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn mt-2 btn-danger"
                  >
                    Assistir Trailer{" "}
                  </a>
                </div>
              ) : (
                <p className="mt-3 text-light">Trailer não disponível</p>
              )}

              {/*               
              <h3>Onde assistir :</h3>
              <div className="row flex-sm-wrap gap-5 my-3 mx-auto align-content-center">
                  {stremers.map((item) => (
                    <div className="col-4 col-lg-1 " key={item.provider_id}>
                      <img
                        className="col-12  col-lg-12  rounded-4 m-auto"
                        src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                        alt=""
                      />
                      <br />
                      <p className="  badge">{item.provider_name}</p>
                    </div>
                  ))}
                </div> */}

              <h3 className="mt-5">Elenco :</h3>
              <div className="row  gap-5 my-3 mx-auto align-content-center">
                {elenco.data.cast.slice(0, limit).map((item) => (
                  <div
                    className=" cardSinope col-4 col-lg-2 "
                    key={item.cast_id}
                    onClick={() => navigate(`/atores/${item.id}`)}
                  >
                    <img
                      className="imgPersonagens col-12 rounded-4 d-block mx-auto shadow"
                      src={
                        item.profile_path
                          ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                          : atorImg
                      }
                      alt={item.name}
                    />
                    <br />
                    <p className="text-link  badge ">{item.name} </p>
                    <br />
                    <strong>{item.character}</strong>
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
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
