import { Component } from 'react';
import { Link } from 'react-router-dom';

class CountryDetails extends Component {
  constructor() {
    super();
    this.state = {
      country: null,
      neighbors: [],
    };
  }

  loadCountry() {
    let country;
    fetch(`https://restcountries.com/v3.1/alpha/${this.props.match.params.id}`)
      .then((response) => response.json())
      .then((data) => {
        country = data[0];
        const neighborCodes = country.borders.join(',');
        return fetch(
          `https://restcountries.com/v3.1/alpha?codes=${neighborCodes}`
        );
      })
      .then((response) => response.json())
      .then((neighbors) => this.setState({ country, neighbors }));
  }

  componentDidMount() {
    this.loadCountry();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadCountry();
    }
  }

  render() {
    const { country, neighbors } = this.state;
    console.log(country);
    return (
      country && (
        <div>
          <h2>{country.name.common}</h2>
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: '40%' }}>Capital</td>
                <td>{country.capital}</td>
              </tr>
              <tr>
                <td style={{ width: '40%' }}>Area</td>
                <td>{country.area} km&sup2;</td>
              </tr>
              <tr>
                <td style={{ width: '40%' }}>Borders</td>
                <td>
                  <ul>
                    {neighbors.map((n) => (
                      <li key={n.cca3.toLowerCase()}>
                        <Link style={{ textDecoration: 'none' }} to={n.cca3}>
                          {n.name.common}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    );
  }
}

export default CountryDetails;
