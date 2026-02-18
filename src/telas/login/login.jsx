import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [nmLogin, setNmLogin] = useState("");
  const [pwLogin, setPwLogin] = useState("");
 
  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (!user) {     
      alert("Usuário não cadastrado")
      return;
    }

    if(nmLogin != user.nmUser || pwLogin != user.senhaUser){
      alert("nome usuario incorreto")
    }if(pwLogin != user.senhaUser){
      alert("senha usuario incorreto")
      
    }
    
    if (nmLogin === user.nmUser && pwLogin === user.senhaUser){
    localStorage.setItem("isAuth" , "true")
      navigate("/home");
    }
  };
  return (
    <main className="bg-login w-100 vh-100 d-grid justify-content-center align-items-center   ">
      <div className="card m-auto shadow bg-secondary p-5 w-100 h-50 gap-3">
        <h2 className="text-center">Login</h2>
        <input
          className="text-center my-3 rounded border-0"
          type="text"
          placeholder="Nome:"
          value={nmLogin}
          onChange={(e) => setNmLogin(e.target.value)}
        />
        <input
          className="text-center rounded border-0"
          type="password"
          placeholder="Senha:"
          value={pwLogin}
          onChange={(e) => setPwLogin(e.target.value)}
        />
        <button
          className="btn"
          onClick={handleLogin}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        >
          Confirmar
        </button>
        <div
          className="text-primary text-center  "
          onClick={() => navigate("/cadastro")}
        >
          <a className="link-primary" href="#">
            cadastrar-se
          </a>
        </div>
      </div>
    </main>
  );
}
