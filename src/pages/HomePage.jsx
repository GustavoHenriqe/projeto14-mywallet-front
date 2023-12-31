import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const [ transactionInfo, setTransactionInfo ] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
  
      const request = axios.get(import.meta.env.VITE_API_URL + "/transacao", config)
      request.then((res) => {
        setTransactionInfo(res.data)
      })
      request.catch((res) => {
        alert(res.response.data.errors)
        navigate("/")
      })
      
  }, [])

  const handlerExit = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  if ( Object.keys(transactionInfo).length === 0 ) {
    return (
      <h1>Carregando . . .</h1>
    )
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {transactionInfo.name}</h1>
        <BiExit 
          data-test="logout" 
          onClick={handlerExit} 
        />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactionInfo.operations.map((o, i) => {
            if ( i < 20 ) {
              return (
                <ListItemContainer key={i} >
                  
                  <div>
                    <span>{o.date}</span>
                    <strong data-test="registry-name"  >{o.description}</strong>
                  </div>

                  <Value data-test="registry-amount" color={o.type}>
                    {o.value}
                  </Value>

                </ListItemContainer>
              )
            }
          })}
        </ul>

        <article>
          <strong>Saldo</strong>
            <Value 
              data-test="total-amount" 
              color={ transactionInfo.value >= 0 ? "positive" : "negative" }
            >
              {transactionInfo.value}
            </Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>

        <button
          data-test="new-income"
          onClick={() => navigate("/nova-transacao/entrada")}
        >
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>

        <button
          data-test="new-expense" 
          onClick={() => navigate("/nova-transacao/saida")}
        >
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>

      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positive" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`