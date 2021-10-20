import { Component } from 'react';
import { Link } from 'react-router-dom';

class CountriesList extends Component {
  render() {
    const { countries } = this.props;

    return (
      <div>
        <ul className="list-group">
          {countries &&
            countries.map((country) => (
              <li className="list-group-item" key={country.name.common}>
                <Link
                  style={{ textDecoration: 'none', color: 'black' }}
                  to={`/${country.cca3.toLowerCase()}`}
                >
                  <img src={country.flags.png} alt={country.name.common} />
                  {country.name.common}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default CountriesList;
