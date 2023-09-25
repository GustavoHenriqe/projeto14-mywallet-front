import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignInPage() {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const navigate = useNavigate()

  const handlerSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = {
        email,
        password
      }

      await axios.post(import.meta.env.VITE_SERVER + "/", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token)
        navigate("/home")
      })

    } catch (res) {
      alert(res.response.data.errors)
    }
  }

  return (
    <SingInContainer>
      <form onSubmit={handlerSubmit}>
        <MyWalletLogo />
        <input
          required 
          placeholder="E-mail" 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required 
          placeholder="Senha"
          type="password" 
          autocomplete="new-password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro" >
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
