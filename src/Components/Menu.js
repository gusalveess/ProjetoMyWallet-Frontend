import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import { useContext, useState, useEffect } from "react";
import DataBase from "./ListData";
export default function Menu() {
  const { user, setUser } = useContext(UserContext);

  const getting = localStorage.getItem("name");
  const stringfy = JSON.stringify(getting);
  const name = JSON.parse(stringfy);

  const Navigate = useNavigate();
  console.log(user);

  function Remove() {
    Navigate("/");
    localStorage.removeItem('token')
    alert("Até mais!");
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  }

  return (
    <>
      <Body>
        <Center>
          <Top>
            <h1>Olá, {name}</h1>
            <ion-icon onClick={() => Remove()} name="log-in-outline"></ion-icon>
          </Top>

          <Mid>
            <DataBase />
          </Mid>

          <Footer>
            <Link to="/Add">
              <div>
                <ion-icon name="add-circle-outline"></ion-icon>
                <p>
                  Nova <br />
                  Entrada
                </p>
              </div>
            </Link>

            <Link to="/Remove">
              <div>
                <ion-icon name="remove-circle-outline"></ion-icon>
                <p>
                  Nova <br />
                  Saída
                </p>
              </div>
            </Link>
          </Footer>
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
`;

const Top = styled.div`
  height: 78px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  h1 {
    font-size: 24px;
    color: #fff;
    font-family: "Raleway", sans-serif;
    font-weight: 700;
  }

  ion-icon {
    font-size: 35px;
    color: #fff;
    cursor: pointer;
  }
`;

const Mid = styled.div`
  width: 326px;
  height: 446px;
  background-color: #fff;
  border-radius: 5px;

  h5 {
    font-size: 20px;
    text-align: center;
    padding-top: 200px;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    color: #868686;
  }

  span {
   display: flex;
   position: relative;
   top: 370px;
   left: 40px;
  }

  h6 {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
  }

  h4 {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    padding-left: 20px;
  }
`;

const Footer = styled.div`
  height: 143px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  div {
    width: 155px;
    height: 114px;
    background-color: #a328d6;
    border-radius: 5px;
    cursor: pointer;
  }

  ion-icon {
    color: #fff;
    font-size: 30px;
    margin-left: 10px;
    margin-top: 11px;
  }

  p {
    padding-left: 10px;
    padding-top: 20px;
    color: #fff;
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    font-size: 17px;
  }

  a {
    text-decoration: none;
  }
`;
