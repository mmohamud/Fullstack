import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa osa={props.osa1} tehtava={props.tehtavia1} />
            <Osa osa={props.osa2} tehtava={props.tehtavia2} />
            <Osa osa={props.osa3} tehtava={props.tehtavia3} />
            
        </div>
    )
}


const Osa = (props) => {
    return (
        <div>
            <p>{props.osa} {props.tehtava}</p>
        </div>
    )
}


const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.tehtavia1 + props.tehtavia2 + props.tehtavia3} tehtävää</p>
        </div>
    )
}


const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14
          }
        ]
      }
  
  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osa1={kurssi.osat[0].nimi} osa2={kurssi.osat[1].nimi} osa3={kurssi.osat[2].nimi} tehtavia1={kurssi.osat[0].tehtavia} tehtavia2={kurssi.osat[1].tehtavia} tehtavia3={kurssi.osat[2].tehtavia}/>
      <Yhteensa tehtavia1={kurssi.osat[0].tehtavia} tehtavia2={kurssi.osat[1].tehtavia} tehtavia3={kurssi.osat[2].tehtavia}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)