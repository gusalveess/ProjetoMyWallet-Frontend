import styled from "styled-components";
import UserContext from "../Context/UserContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DataBase() {
  const { data, setData, UserId } = useContext(UserContext);
  const get = localStorage.getItem("token");
  const string = JSON.stringify(get);
  const auth = JSON.parse(string);

  const getting = localStorage.getItem("id");
  const stringfy = JSON.stringify(getting);
  const converse = JSON.parse(stringfy);
  const Navigate = useNavigate();

  function verify() {
    if (auth.length === 0) {
      Navigate("/");
    }
  }

  useEffect(() => {
    verify();
    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };

    const promisse = axios.get(`https://mywallet-projeto.herokuapp.com/data`, config);
    promisse.then((res) => {
      setData(res.data);
    });
    promisse.catch((err) => console.log(err.response.status));
  }, []);


  //////////////////////////////////////////////////////////////////////
  function List(props) {
    const valor = parseInt(props.Value);
    const correct = valor.toFixed(2).replace(".", ",");
    const [total, setTotal] = useState();
    const [type, setType] = useState("");
    let sum = 0;

    function Del() {
      const confirm = window.confirm("Tem certeza que deseja apagar?");

      if (confirm) {
        const promisse = axios.delete(
          `https://mywallet-projeto.herokuapp.com/data/${props.id}`
        );
        promisse.then(() => {
          alert("Registro Deletado!");
          setTimeout(() => {
            window.location.reload(true);
          }, 100);
        });
        promisse.catch((err) => console.log(err.response.status));
      } else {
        setTimeout(() => {
          window.location.reload(true);
        }, 500);
      }
    }

    useEffect(handleTotal);

    function handleTotal() {
      const positive = data.filter((e) => e.Type === "Entrada");
      const negative = data.filter((e) => e.Type === "Saída");
      let totalPositive = 0;
      let totalNegative = 0;
      for (let i = 0; i < positive.length; i++) {
        totalPositive += parseFloat(positive[i].Value);
      }
      for (let i = 0; i < negative.length; i++) {
        totalNegative += parseFloat(negative[i].Value);
      }
      sum = (totalPositive - totalNegative).toFixed(2);
      if (sum >= 0) {
        setType("plus");
      } else {
        setType("minus");
      }
      setTotal(sum.replace(".", ","));
    }

    return (
      <>
        <DataOne>
          <p>{props.Day}</p>
          <h3>{props.Description}</h3>
          <h2
            style={
              props.Type === "Entrada"
                ? { color: "#03AC00" }
                : { color: "#C70000" }
            }
          >
            {correct}
          </h2>
          <ion-icon onClick={() => Del()} name="close-outline"></ion-icon>
        </DataOne>
        <span>
          <h6>Saldo</h6>
          <h4
            style={
              type === "plus" ? { color: "#03AC00" } : { color: "#C70000" }
            }
          >
            {total}
          </h4>
        </span>
      </>
    );
  }

  ///////////////////////////////////////////////////////////
  return (
    <>
      {data.length === 0 ? (
        <h5>
          Não há registros de <br /> entrada ou saída
        </h5>
      ) : (
        data.map((item, index) => (
          <List
            key={index}
            Day={item.Day}
            Description={item.Description}
            Value={item.Value}
            Type={item.Type}
            _id={item._id}
          />
        ))
      )}
    </>
  );
}
const DataOne = styled.div`
  display: flex;

  p {
    padding-top: 23px;
    padding-left: 12px;
    justify-content: space-around;
    font-size: 20px;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    color: #c6c6c6;
  }

  h3 {
    padding-top: 23px;
    padding-left: 10px;
    color: #000;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size: 20px;
  }

  h2 {
    padding-left: 40px;
    padding-top: 23px;
    font-size: 19px;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
  }

  ion-icon {
    color: #000;
    font-size: 20px;
    padding-left: 40px;
    padding-top: 23px;
  }
  
`;
