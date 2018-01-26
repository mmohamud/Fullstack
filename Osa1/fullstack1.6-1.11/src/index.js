import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = () => {
    return (
        <div>
            <h1>Anna palautetta</h1>
        </div>
    )
}

const Button = (props) => (        
        <button onClick={props.handleClick}>
        {props.text}
        </button>
    )

const Statistic = (props) => (   
    <tr>
    <td>{props.text}</td>
    <td>{props.statistiikka}</td>
    </tr>
)

const Positiivisia = (props) => (
    <tr>
    <td>{props.text}</td>
    <td>{props.statistiikka}%</td>
    </tr>
)

const Statistics = (props) => {
    return (
        <div>
            <table>
                <tbody>
                    <Statistic statistiikka={props.state.hyva} text="Hyvä" />                
                    <Statistic statistiikka={props.state.neutraali} text="Neutraali" />
                    <Statistic statistiikka={props.state.huono} text="Huono" />         
                    <Statistic statistiikka={props.state.summa / props.state.aania} text="Keskiarvo" /> 
                    <Positiivisia statistiikka={props.state.positiivisia / props.state.aania * 100} text="Positiivisia" />                                
                </tbody>
            </table>
        </div>
    )
}
class App extends React.Component  {
    constructor (props) {
        super (props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            aania: 0,
            positiivisia: 0,
            summa: 0
        }
    }

    asetaArvoon = (nappi) => {
        if (nappi == "hyva") {
            return () => {
                this.setState({
                    hyva: this.state.hyva +1,
                    positiivisia: this.state.positiivisia +1,
                    summa: this.state.summa +1,
                    aania: this.state.aania +1
                })
            }
        } else if (nappi == "huono") {
            return () => {
                this.setState({
                    huono: this.state.huono +1,
                    summa: this.state.summa -1,
                    aania: this.state.aania +1
                })
            }
        } else {
            return () => {
                this.setState({
                    neutraali: this.state.neutraali +1,
                    positiivisia: this.state.positiivisia +1,
                    aania: this.state.aania +1
                })
            }
        }
    }

    

    render() {
        if (this.state.aania == 0) {
        return (
            <div>
            <div>
                <Otsikko/> 
                <Button handleClick={this.asetaArvoon("hyva")} text="Hyvä" />
                <Button handleClick={this.asetaArvoon("neutraali")} text="Neutraali" />    
                <Button handleClick={this.asetaArvoon("huono")} text="Huono" />  
            </div>
            <h2>Statistiikka</h2> 
            <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    }
        return ( 
            <div>               
                <div>
                <Otsikko/>
                <Button handleClick={this.asetaArvoon("hyva")} text="Hyvä" />
                <Button handleClick={this.asetaArvoon("neutraali")} text="Neutraali" />    
                <Button handleClick={this.asetaArvoon("huono")} text="Huono" />   
                </div>

                <div>
                <h2>Statistiikka</h2>     
                <Statistics state={this.state} />      
                </div>
                </div>
        )
    }
    }

ReactDOM.render(<App />, document.getElementById('root'));