import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();
  const [nmUser, setNmUser] = useState("");
  const [senhaUser, setSenhaUser] = useState("");
  const handleCadastro = () => {
    const user = {
      nmUser,
      senhaUser,
      role: "user",
    };
    localStorage.setItem("user", JSON.stringify(user));
    alert("usuario cadastrado");
    navigate("/");
  };
  return (
    <main className=" bg-login w-100 vh-100 d-grid justify-content-center align-itens-center   ">
      <div className="col-sm-12 card m-auto shadow bg-dark p-5 w-100 h-50 gap-3">
        <h2 className="text-center text-light">Cadastro</h2>
        <input
          className="text-center my-3   rounded border-0"
          type="text"
          placeholder="Nome:"
          value={nmUser}
          onChange={(e) => setNmUser(e.target.value)}
        />
        <input
          className="text-center rounded border-0"
          type="password"
          placeholder="Senha:"
          value={senhaUser}
          onChange={(e) => setSenhaUser(e.target.value)}
        />
        <button
          className="btn  text-light"
          onClick={handleCadastro}
          onKeyDown={(e) => e.key === "Enter" && handleCadastro()}
        >
          Cadastrar
        </button>

        <button className="btn  text-light" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
    </main>
  );
}
