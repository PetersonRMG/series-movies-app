import { Route, Routes } from 'react-router-dom';

import Login from './telas/login/login'
import Cadastro from './telas/cadastro/cadastro';
import Home from './telas/home/home';
import Filmes from './telas/filmes/filmes'; 
import Series from './telas/series/series';
import Sinopse from './telas/sinopse/sinopse';
import Atores from './telas/atores/atores';



import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
 
import './App.css'

function App() {
   

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/series" element={<Series/>} />
        <Route path="/filmes" element={<Filmes/>} />
        <Route path="/filme/:id" element={<Sinopse/>} />
        <Route path="/atores/:id" element={<Atores/>} />
      </Routes>
    </>
  );
}

export default App
