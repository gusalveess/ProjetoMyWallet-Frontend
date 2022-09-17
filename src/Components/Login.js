import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import react, { useState, useContext } from "react";
import UserContext from "../Context/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function Login() {
  const [login, setLogin] = useState("Entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { setUser, setToken, setId } = useContext(UserContext);
  const Navigate = useNavigate();

  function Post() {
    const body = {
      email: email,
      senha: password,
    };
    const promise = axios.post("https://mywallet-projeto.herokuapp.com/sign-in", body);
    promise.then((res) => {
      setToken(localStorage.setItem("token", res.data.token));
      setUser(localStorage.setItem("name", res.data.name));
      setId(localStorage.setItem("id", res.data.IdUser));
      setLogin(<ThreeDots color="#FFFFFF" height={13} width={51} />);
      setDisabled(true);
      setTimeout(() => {
        Navigate("/Menu");
      }, 1500);
    });
  }

  function HandleForm(e) {
    e.preventDefault();
    Post();
  }

  return (
    <>
      <Body>
        <Center>
          <h1>MyWallet</h1>
          <form onSubmit={HandleForm}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              disabled={disabled}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={disabled}
            />

            <Button>{login}</Button>
          </form>

          <Link to="/Cadastro">
            <p>Primeira vez? Cadastre-se!</p>
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
    margin-top: 159px;
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
  justify-content: center;
  align-items: center;
`;
