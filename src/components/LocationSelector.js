import React from "react";
import countriesData from "../data/countriesData.json";
import "../styles/LocationSelector.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const COUNTRIES = countriesData.reduce((acc, country) => {
  acc[country.name] = country.isoCode;
  return acc;
}, {});

const COUNTRY_OPTIONS = Object.keys(COUNTRIES).map((country) => (
  <option value={country} key={country} />
));

export default class LocationSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cache: {},
      regions: {},
      regionOptionsArr: [],
      cityOptionsArr: [],
    };
  }

  async fetchData({ countryCode, regionCode }) {
    const fetchUrl = `https://api.countrystatecity.in/v1/countries/${countryCode}/states${
      regionCode ? `/${regionCode}/cities` : ""
    }`;

    if (this.state.cache[fetchUrl]) {
      return this.state.cache[fetchUrl];
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "X-CSCAPI-KEY": API_KEY,
      },
      mode: "cors",
      redirect: "follow",
    };

    const response = await fetch(fetchUrl, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    this.setState({ cache: { ...this.state.cache, [fetchUrl]: data } });
    return data;
  }

  async updateDatalistsState(countryChanged) {
    const { location } = this.props;
    const initialState = {
      cityOptionsArr: [],
      ...(countryChanged && { regions: {}, regionOptionsArr: [] }),
    };

    if (
      (countryChanged && !COUNTRIES[location.country]) ||
      (!countryChanged && !this.state.regions[location.region])
    ) {
      this.setState(initialState);
      return;
    }

    try {
      const countryCode = COUNTRIES[location.country];
      const fetchedData = countryChanged
        ? await this.fetchData({ countryCode })
        : await this.fetchData({
            countryCode,
            regionCode: this.state.regions[location.region],
          });

      const newState = countryChanged
        ? {
            regions: fetchedData.reduce((acc, region) => {
              acc[region.name] = region.iso2;
              return acc;
            }, {}),
            regionOptionsArr: fetchedData.map((regionData) => (
              <option value={regionData.name} key={regionData.id} />
            )),
            cityOptionsArr: [],
          }
        : {
            cityOptionsArr: fetchedData.map((cityData) => (
              <option value={cityData.name} key={cityData.id} />
            )),
          };

      this.setState(newState);
    } catch (error) {
      console.error(
        `Couldn't fetch ${countryChanged ? "regions" : "cities"}`,
        error
      );
      this.setState(initialState);
    }
  }

  componentDidUpdate(prevProps) {
    const { country: oldCountry, region: oldRegion } = prevProps.location;
    const { country, region } = this.props.location;

    if (oldCountry !== country) {
      this.updateDatalistsState(true);
    } else if (
      COUNTRIES[country] &&
      oldCountry === country &&
      oldRegion !== region
    ) {
      this.updateDatalistsState(false);
    }
  }

  render() {
    const { location, handleChange } = this.props;

    return (
      <fieldset className="location-selector">
        <legend>Location:</legend>
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          data-wrapper="location"
          id="country"
          name="country"
          list="country-names-list"
          value={location.country}
          autoComplete="off"
          placeholder="Uruguay"
          onChange={handleChange}
        />
        <datalist id="country-names-list">{COUNTRY_OPTIONS}</datalist>

        <label htmlFor="region">Region:</label>
        <input
          type="text"
          data-wrapper="location"
          id="region"
          name="region"
          {...(!!this.state.regionOptionsArr.length && {
            list: "country-regions-list",
          })}
          value={location.region}
          autoComplete="off"
          placeholder="Montevideo"
          onChange={handleChange}
        />
        {!!this.state.regionOptionsArr.length && (
          <datalist id="country-regions-list">
            {this.state.regionOptionsArr}
          </datalist>
        )}

        <label htmlFor="city">City:</label>
        <input
          type="text"
          data-wrapper="location"
          id="city"
          name="city"
          {...(!!this.state.cityOptionsArr.length && { list: "cities-list" })}
          value={location.city}
          autoComplete="off"
          placeholder="Montevideo"
          onChange={handleChange}
        />
        {!!this.state.cityOptionsArr.length && (
          <datalist id="cities-list">{this.state.cityOptionsArr}</datalist>
        )}

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          data-wrapper="location"
          id="address"
          name="address"
          value={location.address}
          placeholder=""
          onChange={handleChange}
        />

        <label htmlFor="postal-code">Postal code:</label>
        <input
          type="text"
          data-wrapper="location"
          id="postal-code"
          name="postalCode"
          value={location.postalCode}
          placeholder=""
          onChange={handleChange}
        />
      </fieldset>
    );
  }
}
