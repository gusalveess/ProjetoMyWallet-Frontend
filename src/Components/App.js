import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from '../Context/UserContext'
import Login from "./Login";
import Cadastro from "./Cadastro";
import Menu from './Menu'
import Add from './Add'
import Remove from './Remove'

export default function App() {

  const [token, setToken] = useState("")
  const [user, setUser] = useState("")
  const [data, setData] = useState([])
  const [UserId, setId] = useState("")

  return (
    <UserContext.Provider value={{token, setToken, user, setUser, data, setData, UserId, setId}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Add" element={<Add />} /> 
        <Route path="/Remove" element={<Remove />} /> 
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  );
}
