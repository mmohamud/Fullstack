import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


const Person = (props) => {
    const {person, persons, filter} = props 
    return (      
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
        </tr>       
    )
}

function filterPersons(props) {
    const {persons, filter} = props
    return persons.filter((person) =>
        person.name.toUpperCase().includes(filter.toUpperCase())
    )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
    
  }

  componentDidMount()  {   
    axios     
        .get('http://localhost:3001/persons')
            .then(response => {
                this.setState({persons: response.data})
            })
  }
  

  addPerson = (event) => {
      event.preventDefault()
      console.log('nappia painettu')
      const personObject = {
          name: this.state.newName,
          id: this.state.newName,
          number: this.state.newNumber
      }
      
      let persons = this.state.persons
      if (!this.state.persons.find((person) => person.name.toUpperCase() === personObject.name.toUpperCase())) {
        persons = this.state.persons.concat(personObject)
      }

      this.setState({
          persons: persons,
          newName: '',
          newNumber: '',
          filter: ''
      })
  }

  handleNameChange = (event) => {
      console.log(event.target.value)
      this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({newNumber: event.target.value})
}

  handleFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }

  render() {
    let persons = this.state.persons

    if (this.state.filter) {
        persons = filterPersons({persons: this.state.persons, filter: this.state.filter})
    }
    return (    
            
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
            <form>
                Rajaa näytettäviä <input value={this.state.filter} 
                onChange={this.handleFilterChange}
                />
            </form>
        </div>
        <br></br>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName}
            onChange={this.handleNameChange}
            />
            <br></br>
            numero: <input value={this.state.newNumber}
            onChange={this.handleNumberChange} 
            />
          </div>
          <div>
            <button type="submit">lisää</button>            
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
            <tbody>
                {persons.map(person => <Person key={person.name} person={person}  persons={this.state.persons} filter={this.state.filter}/>)}
            </tbody>
        </table>
      </div>      
    )
  }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
  )