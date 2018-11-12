import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

const Country = ({ countries, setFilter }) => {

    if (countries.length > 10) {
      return (
        <div>
          <p>Too many matches, specify a little more</p>
        </div>
      )

    } else if (countries.length === 0) {
          return (
              <div>
                  <p>No results</p>
              </div>
          )
      }
    
     else if (countries.length === 1) {
      const country = countries[0]
      return (
        <div>
          <h1>{country.name}</h1>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <img src={country.flag}  alt="Flag"/>
        </div>
      )
    }
    else if (countries.length <= 10 && countries.length > 1) {
        return (
          <div>
            {countries.map(country => <div onClick={() => setFilter(country.name)} key={country.name}>{country.name}</div>)}
          </div>
        )
      }
  }
  
  class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        countries: [],
        filter: ''
      }
    }
  
    setFilter = (props) => {
      this.setState({
        filter: props
      })
    }
  
    componentWillMount() {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          this.setState({ countries: response.data })
        })
    }
  
    handleFilterChange = (event) => {
      this.setState({
        filter: event.target.value
      })
    }
  
    render() {
      const results = this.state.filter.length === 0 ? this.state.countries : this.state.countries.filter(country => country.name.toUpperCase().includes(this.state.filter.toUpperCase()))
      return (
        <div>
          Find countries: <input 
            id="filter"
            value={this.state.filter}
            onChange={this.handleFilterChange}
          />
          <Country countries={results} setFilter={this.setFilter} />
        </div>
      )
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
registerServiceWorker();