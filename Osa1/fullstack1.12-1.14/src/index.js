import React from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}> 
    {props.text}
    </button>
) 

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      min: 0,
      max: 5,
      t: [0, 0, 0, 0, 0, 0]
    }
  }

    asetaArvoon = (arvo) => {
        return () => {
            this.setState({selected: arvo})
        }
    }  
    randomLuku = () => {
        return  Math.floor(Math.random() * (this.state.max - this.state.min + 1) + this.state.min);    
    }

    aanesta = () => {
        let kopio = this.state.t.slice()
        kopio[this.state.selected] = kopio[this.state.selected] +1
        this.setState({t: kopio})
        
    }

    enitenAania = () => {   
        let index = 0
        let biggestIndex = 0
        this.state.t.forEach((luku) => {
            if (luku > this.state.t[biggestIndex]) {
                biggestIndex = index
            }
            index++ 
        })
        return biggestIndex
    }

  render() {
    return (
        
      <div>
        <Button handleClick={this.asetaArvoon(this.randomLuku())} text="Next anectode"/> 
        <Button handleClick={this.aanesta} text="Vote" />
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <p>has {this.state.t[this.state.selected]} votes</p>

        <h2>Anectode with most votes</h2>
        
        <p>{this.props.anecdotes[this.enitenAania()]}</p> 
        <p>has {this.state.t[this.enitenAania()]} votes</p>      
      </div>
      
    )
  }
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)