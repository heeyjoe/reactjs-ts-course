import { useState, FormEvent }  from 'react'
import './App.css'

import LogoImg from "./assets/logo.png";

/*
Cálculo: alcool / gasolina
se resultado < 0.7 compensa usar álcool
*/

interface CombustivelProps{
  title: string;
  valor: string | number;
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [combustivel, setCombustivel] = useState<CombustivelProps>();

function calcular(event: FormEvent){
  event.preventDefault();
  
  let resultado = (alcoolInput / gasolinaInput)
  
  if(resultado >= 0.7){
    //alert('Compensa usar gasolina')
    setCombustivel({ title: 'Gasolina', valor: gasolinaInput } )
  }
  else{
    setCombustivel({ title: 'Álcool', valor: alcoolInput })
  }
}

function formatarMoeda(valor: number){
  let valorFormatado = valor.toLocaleString("pt-br",
    {
      style: "currency",
      currency: "BRL"
    }
  )
  return valorFormatado
}

  return (
    <div>
      <main className='container'>
        <img className='logo' 
             src={LogoImg} 
             alt="Logo da calculadora de gasolina x álcool" />
        <h1 className='title'>Qual melhor opção?</h1>
      
      <form className='form' onSubmit={calcular}>
        <label>Álcool (Preço por L):</label>
        <input 
          className='input'
          type='number'
          placeholder='6,35'
          min='1'
          step='0.01'
          required
          value={alcoolInput}
          onChange={(e) => setAlcoolInput(Number(e.target.value))}
        />
        <br/>
        <label>Gasolina (Preço por L):</label>
        <input 
          className='input'
          type='number'
          placeholder='6,35'
          min='1'
          step='0.01'
          required
          value={gasolinaInput}
          onChange={(e) => setGasolinaInput(Number(e.target.value))}
        />
        <br/>
        <input className='button' type="submit" value='Calcular' />
      </form>

      {combustivel && Object.keys(combustivel).length > 0 &&(
        <section className='result'>
          <h2 className='result-title'>Compensa usar {combustivel?.title}</h2>
          <span>Valor {formatarMoeda(combustivel?.valor)}</span>
        </section>
      )}

      </main>
    </div>
  )
}

export default App
