import React from "react";
import { tmdb } from "../../api/tmdb";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinners from "../../components/spinners/spinners";
import BackBtn from "../../components/backBtn/backBtn";
import atorImg from "../../assets/img/ator.png";
import { mediaType } from "../../components/mediaType/mediaType";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Atores() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [type,setType] = useState('');
  const localizar = useLocation();
  const [load, setLoad] = useState(true);
  const [moviesPerson, setMoviesPerson] = useState([]);
  const [seriesPerson, setSeriesPerson] = useState([]);
  // const [limit, setLimit] = useState(10);

  useState(() => {
    if (localizar.state ) {
      setType(localizar.state.type);
    }
  }, [localizar.state]);  

  const [personagem, setPersonagem] = useState([]);

  useEffect(() => {
    async function loadPersonagem() {
      // const res = await api.get(`/movie/${id}/watch/providers`);
      const elen = await tmdb.get(`/person/${id}`);
      const maisMidia = await tmdb.get(`/person/${id}/combined_credits`);
      const midia = maisMidia.data.cast;
      const filmeAtor = midia.filter((item) => item.media_type === "movie");
      const serieAtor = midia.filter((item) => item.media_type === "tv");
      //   const response = await api.get(`/movie/${id}`);
      //   setFilme(response.data);
      // setStremers(res.data.results)
      setPersonagem(elen.data);
      setMoviesPerson(filmeAtor);
      setSeriesPerson(serieAtor);
      setLoad(false);
 
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
          {/* <BackBtn
            labelBack="←Voltar"
            labelSecond={type === "tv" ? "Séries" : "Filmes"}
            secoundRoute="/cardMidias"
            secondState={type}
          /> */}

          <div className="col-sm-2 text-start row justify-content-between">
            <button
              className="btn btn-link text-light col-5 "
              onClick={() => navigate(-1)}
            >
              ←Voltar
            </button>
            
              <button
                className="btn btn-link text-light col-5"
                onClick={() =>
                  navigate("/cardMidias", {
                    state: {
                      type: type,
                    },
                  })
                }
              >
                {type === "tv" ? "Séries" : "Filmes"}
              </button>
            
          </div>
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
                <h2>{personagem.name} </h2>
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

              <div>
                <h3 className="mt-5">Outros Filmes :</h3>
                <Swiper
                  spaceBetween={16}
                  slidesPerView="auto"
                  grabCursor={true}
                >
                  {moviesPerson.map((item) => (
                    <SwiperSlide
                      style={{ width: "140px" }}
                      className=" cardSinope col-4 col-lg-2 "
                      key={item.cast_id}
                      onClick={() =>
                        navigate(`/filme/${item.id}`, {
                          state: {
                            type: mediaType.MOVIE,
                          },
                        })
                      }
                    >
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : atorImg
                        }
                        alt={item.name}
                        className="w-100 rounded"
                      />
                      <p className="text-center mt-2 small">
                        {item.original_title}{" "}
                      </p>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div>
                <h3 className="mt-5">Outras Séries :</h3>
                <Swiper
                  spaceBetween={16}
                  slidesPerView="auto"
                  grabCursor={true}
                >
                  {seriesPerson.map((item) => (
                    <SwiperSlide
                      style={{ width: "140px" }}
                      className=" cardSinope col-4 col-lg-2 "
                      key={item.cast_id}
                      onClick={() =>
                        navigate(`/tv/${item.id}`, {
                          state: {
                            type: mediaType.TV,
                          },
                        })
                      }
                    >
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : atorImg
                        }
                        alt={item.name}
                        className="w-100 rounded"
                      />
                      <p className="text-center mt-2 small">
                        {item.original_name}{" "}
                      </p>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            
          </div>
        </>
      )}
    </main>
  );
}
