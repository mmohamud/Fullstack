import React from 'react'

const Kurssi = (props) => {
    const {kurssi} = props
    return (
        <div>
            <Otsikko nimi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

const Osa = (props) => {
    const {osa} = props
    return (
        <div>
            <p>{osa.nimi} {osa.tehtavia}</p>
        </div>
    )
}
const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.nimi}</h1>
        </div>
    )
}


const Sisalto = (props) => {
  const {osat} = props
  return(
    <div>
      {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
    </div>
  )
}
const Yhteensa = (props) => {
  const {osat} = props
  const tehtavat = osat.map(osa => osa.tehtavia)
  const reducer = (accumulator, currentvalue) => accumulator + currentvalue;
  return (
    <p>yhteensä {(tehtavat.reduce(reducer))} tehtävää</p>
  )
}

export default Kurssi