import React from "react";
import { tmdb } from "../../api/tmdb";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinners from "../../components/spinners/spinners";
import BackBtn from "../../components/backBtn/backBtn";
import atorImg from "../../assets/img/ator.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Sinopse() {
  const localizar = useLocation();
  const [type, setType] = useState();
  const [filme, setFilme] = useState(null);
  const [load, setLoad] = useState(true);
  // const [limit, setLimit] = useState(10);
  const [trailer, setTrailer] = useState([]);
  // const [stremers, setStremers] = useState([])

  useState(() => {
    if (localizar.state?.type !== undefined) {
      setType(localizar.state.type);
      console.log(type, "testando type ");
    }
  }, [localizar.state]);
  console.log(type, 'saporra ai sinopse')

  const [elenco, setElenco] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function loadFilme() {
      try {
        const endpointElenco =
          type === 0 ? `/tv/${id}/credits` : type === 1 ? `/movie/${id}/credits`: "";
        const data = type === 0 ? `/tv/${id}` : type === 1 ? `/movie/${id}`: "";
        const endpointTrailer =
          type === 0
            ? `/tv/${id}/videos?language=pt-BR`
            : `/movie/${id}/videos?language=pt-BR`;
        const elen = await tmdb.get(endpointElenco);
        const response = await tmdb.get(data);
        const trai = await tmdb.get(endpointTrailer);

        setFilme(response.data);
        setElenco(elen);
        setTrailer(trai.data.results);
        console.log(response.data, "Erro ao puxar informaçoes");
      } catch (erro) {
        console.log(erro, "Erro ao puxar informaçoes");
      }
      // const res = await api.get(`/movie/${id}/watch/providers`);
      // setStremers(res.data.results)
      setLoad(false);

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
          <BackBtn
            labelBack={"←Voltar"}
            labelSecond={type === 0 ? "Séries" : "Filmes"}
            secoundRoute="/cardMidias"
          />

          <div className="row mt-4">
            <div className="col-md-4">
              <img
                className="w-75 rounded"
                src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
              />
            </div>

            <div className="col-md-8">
              <div className="d-flex align-content-center justify-content-between col-12 col-lg-6">
                <h2>{filme.title || filme.name} </h2>
                <p className="mt-3 small">
                  <span className="badge bg-success">Diretor</span> - {/* 1 */}
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
              {type === 0 && filme?.seasons && (
                <div className="mt-4">
                  <h4 className="mb-3">Temporadas:</h4>

                  <Swiper
                    spaceBetween={16}
                    slidesPerView="auto"
                    grabCursor={true}
                  >
                    {filme.seasons.map((item) => (
                      <SwiperSlide key={item.id} style={{ width: "80px" }}>
                        <img
                          src={
                            item.poster_path
                              ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                              : "/placeholder-season.png"
                          }
                          className="w-100 rounded"
                          alt={item.name}
                        />
                        <p className="text-link  badge ">{item.name} </p>
                        <br />
                        <strong>{item.character}</strong>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
              <div>
                <h3 className="mt-5">Elenco :</h3>
                <Swiper
                  spaceBetween={16}
                  slidesPerView="auto"
                  grabCursor={true}
                >
                  {elenco.data.cast.map((item) => (
                    <SwiperSlide
                      style={{ width: "140px" }}
                      lassName=" cardSinope col-4 col-lg-2 "
                      key={item.cast_id}
                      onClick={() => navigate(`/atores/${item.id}`)}
                    >
                      <img
                        src={
                          item.profile_path
                            ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                            : atorImg
                        }
                        alt={item.name}
                        className="w-100 rounded"
                      />
                      <p className="text-link  badge ">{item.name} </p>
                      <br />
                      <strong>{item.character}</strong>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {/* <div className="row  gap-5 my-3 mx-auto align-content-center">
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
              </div> */}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
