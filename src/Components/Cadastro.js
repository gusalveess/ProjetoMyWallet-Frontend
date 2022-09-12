import styled from "styled-components";
import react, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

export default function Cadastro() {
  const Navigate = useNavigate()
  const [signup, setSignup] = useState("Cadastrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(false);


  function Post() {
    const body = {
        name: name,
        email: email,
        password: password,
        passwordConfirm: confirm
     }
     const promise = axios.post("http://localhost:5000/users", body)

     promise.then(() => {
     setSignup(<ThreeDots color="#FFFFFF" height={13} width={51} />)
     setDisabled(true)
     alert('Usuário cadastrado, faça o Login.')
     setTimeout(() => {
      Navigate("/");
    }, 1000);
     }
     );
     promise.catch('algo deu errado')
 }

  function handleForm(e) {
    e.preventDefault();
    Post()

    if (password != confirm) {
      alert("As Senhas são diferentes");
      setDisabled(false);
      setSignup("Cadastrar");

    }
  }

  return (
    <>
      <Body>
        <Center>
          <h1>MyWallet</h1>
          <form onSubmit={handleForm}>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              disabled={disabled}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={disabled}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={disabled}
              required
            />
            <input
              type="password"
              placeholder="Confirme a senha"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              disabled={disabled}
              required
            />

            <Button>{signup}</Button>
          </form>

          <Link to="/">
            <p>Já tem uma conta? Entre agora!</p>
          </Link>
        </Center>
      </Body>
    </>
  );
}

const Body = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #925ebe;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  h1 {
    font-family: "Saira Stencil One", cursive;
    font-size: 32px;
    color: #fff;
    margin-top: 95px;
    margin-bottom: 27px;
  }

  input {
    height: 58px;
    width: 300px;
    margin-bottom: 13px;
    border-radius: 5px;
    outline: none;
    border: none;
    font-size: 20px;
    padding-left: 15px;
  }

  input::placeholder {
    color: #000;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
  }


  p {
    font-family: "Raleway", sans-serif;
    font-size: 15px;
    font-weight: 700;
    padding-top: 37px;
    color: #fff;
  }

  a {
    text-decoration: none;
  }
`;

const Button = styled.button`
  width: 320px;
  height: 58px;
  background-color: #a328d6;
  border: none;
  border-radius: 5px;
  margin-top: 13px;
  color: #fff;
  font-family: "Raleway", sans-serif;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
