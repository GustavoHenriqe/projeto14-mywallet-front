import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

export default function TransactionsPage() {
  const [ value, setValue ] = useState("")
  const [ description, setDescription ] = useState("")

  const navigate = useNavigate()
  const { tipo } = useParams()

  const handlerSubmit = (e) => {
    e.preventDefault()

    const data = {
      value,
      description
    }

    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }

    const request = axios.post(import.meta.env.VITE_API_URL + "/nova-transacao/" + tipo, data, config)
    
    request.then((res) => {
      alert("Sucess")
      navigate("/home")
    })

    request.catch((res) => {
      alert(res.response.data.errors)
      navigate("/home")
    })
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={handlerSubmit}>
        <input
          data-test="registry-amount-input"
          required 
          placeholder="Valor" 
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)} 
        />
        <input
          required
          data-test="registry-name-input" 
          placeholder="Descrição" 
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
        />
        <button 
          type="submit" 
          data-test="registry-save"
        >Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
