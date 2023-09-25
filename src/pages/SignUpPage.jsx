import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignUpPage() {
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ passwordRepet, setPasswordRepet ] = useState("")

  const navigate = useNavigate()

  const handlerSubmit = (e) => {
    e.preventDefault()

    const data = {
      name,
      email,
      password
    }

    if ( password !== passwordRepet ) {
      return alert("Password does not match")
    }

    const request = axios.post(import.meta.env.VITE_SERVER + "/cadastro", data)

    request.then((res) => {
      alert("Sucess")
      navigate("/")
    })
    request.catch((res) => {
      alert(res.response.data.errors)
    })
  }

  return (
    <SingUpContainer>
      <form onSubmit={handlerSubmit}>
        <MyWalletLogo />
        <input
          required 
          placeholder="Nome" 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
        <input
          required 
          placeholder="E-mail" 
          type="email"
          value={email}
          onChange={(e) => {setEmail(e.target.value)}} 
        />
        <input
          required 
          placeholder="Senha" 
          type="password" 
          autocomplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          min={3} 
        />
        <input
          required 
          placeholder="Confirme a senha" 
          type="password" 
          autocomplete="new-password"
          value={passwordRepet}
          onChange={(e) => setPasswordRepet(e.target.value)} 
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
