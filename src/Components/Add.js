import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export default function Add() {
  const get = localStorage.getItem("token");
  const string = JSON.stringify(get);
  const auth = JSON.parse(string);
  
  const Navigate = useNavigate();

  const [value, setValue] = useState("");
  const [Desc, setDesc] = useState("");
  const [save, setSave] = useState("Salvar Entrada");
  const [disabled, setDisabled] = useState(false);

  function Post() {
    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };

    const body = {
      value: value,
      description: Desc,
      type: "Entrada",
    };

    const promise = axios.post("http://localhost:5000/data", body, config);
    promise.then((res) => {
      setDisabled(true);
      setSave(<ThreeDots color="#FFFFFF" height={13} width={51} />);
      alert("Registro Cadastrado com sucesso!");
      Navigate("/Menu");
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
          <div>
            <h1>Nova Entrada</h1>
          </div>
          <form onSubmit={HandleForm}>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Valor"
              disabled={disabled}
            />
            <input
              type="text"
              value={Desc}
              onChange={(e) => setDesc(e.target.value)}
              disabled={disabled}
              placeholder="Descrição"
            />
            <Button>{save}</Button>
          </form>
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

  div {
    height: 96px;
    width: 100%;
    display: flex;
    align-items: center;
  }

  h1 {
    font-size: 24px;
    color: #fff;
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    padding-left: 24px;
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

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
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
