import { Component } from 'react';
import NavBar from './components/NavBar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      countries: null,
    };
  }

  loadCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => this.setState({ countries: data }));
  };

  componentDidMount() {
    this.loadCountries();
  }

  render() {
    const { countries } = this.state;

    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <div className="row mainSection">
              <div
                className="col-4"
                style={{ maxHeight: '90vh', overflowY: 'scroll' }}
              >
                <CountriesList countries={countries} />
              </div>
              <div className="col-6">
                <Switch>
                  <Route path="/:id" component={CountryDetails} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
