// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { tmdb } from "../../api/tmdb";

// export default function CardMidia({dados, tipo}) {
//     const navigate = useNavigate();
//     const {
//         id,
//         title,
//         name,
//         poster_path,
//         vote_average,
//     }= dados;
//     const midiaCard = title || name;
//     return (
//       <div className="card-media" onClick={() => navigate(`/${tipo}/${id}`)}>
//         <img
//           src={
//             poster_path
//               ? `https://image.tmdb.org/t/p/w500${poster_path}`
//               : noImage
//           }
//           alt={midiaCard}
//         />

//         <div className="card-info">
//           <h5>{midiaCard}</h5>
//           <span>⭐ {vote_average?.toFixed(1)}</span>
//         </div>
//       </div>
//     );
// }