import React from "react";
import countriesData from "../../../data/countriesData.json";
import LocationSelectorInput from "./LocationSelectorInput";
import "../../../styles/LocationSelector.css";

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

    const inputs = [
      {
        labelText: "Country:",
        inputId: "country",
        name: "country",
        autoCapitalize: "words",
        value: location.country,
        placeholder: "Uruguay",
        dataListId: "country-names-list",
        dataListOptions: COUNTRY_OPTIONS,
      },
      {
        labelText: "Region:",
        inputId: "region",
        name: "region",
        autoCapitalize: "words",
        value: location.region,
        placeholder: "Montevideo",
        dataListId: "country-regions-list",
        dataListOptions: this.state.regionOptionsArr,
      },
      {
        labelText: "City:",
        inputId: "city",
        name: "city",
        autoCapitalize: "words",
        value: location.city,
        placeholder: "Montevideo",
        dataListId: "region-cities-list",
        dataListOptions: this.state.cityOptionsArr,
      },
      {
        labelText: "Address:",
        inputId: "address",
        name: "address",
        value: location.address,
      },
      {
        labelText: "Postal code:",
        inputId: "postal-code",
        name: "postalCode",
        value: location.postalCode,
      },
    ].map((inputData, index) => (
      <LocationSelectorInput
        {...inputData}
        autoComplete={true}
        handleChange={handleChange}
        key={index}
      />
    ));

    return (
      <fieldset className="location-selector">
        <legend>Location:</legend>
        {inputs}
      </fieldset>
    );
  }
}
