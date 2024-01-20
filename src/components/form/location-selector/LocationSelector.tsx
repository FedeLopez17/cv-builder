import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import countriesData from "../../../data/countriesData.json";
import LocationSelectorInput from "./LocationSelectorInput";
import { APICity, APIRegion, Location } from "../../../types";

// These component likely needs bug fixing.

const API_KEY: string = import.meta.env.VITE_REACT_APP_API_KEY;

const COUNTRIES: Record<string, string> = countriesData.reduce(
  (acc: Record<string, string>, country) => {
    acc[country.name] = country.isoCode;
    return acc;
  },
  {}
);

const COUNTRY_OPTIONS = Object.keys(COUNTRIES).map((country) => (
  <option value={country} key={country} />
));

type StateType = {
  cache: { [key: string]: APIRegion | APICity };
  regions: Record<string, string>;
  regionOptionsArr: JSX.Element[];
  cityOptionsArr: JSX.Element[];
};

function LocationSelector({
  location,
  handleChange,
}: {
  location: Location;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const [state, setState] = useState<StateType>({
    cache: {},
    regions: {},
    regionOptionsArr: [],
    cityOptionsArr: [],
  });

  const fetchData = useCallback(
    async ({
      countryCode,
      regionCode,
    }: {
      countryCode: string;
      regionCode?: string;
    }) => {
      const fetchUrl = `https://api.countrystatecity.in/v1/countries/${countryCode}/states${
        regionCode ? `/${regionCode}/cities` : ""
      }`;

      if (state.cache[fetchUrl]) {
        return state.cache[fetchUrl];
      }

      const requestOptions: RequestInit = {
        method: "GET",
        headers: {
          "X-CSCAPI-KEY": API_KEY,
        },
        mode: "cors" as RequestMode,
        redirect: "follow" as RequestRedirect,
      };

      const response = await fetch(fetchUrl, requestOptions);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        cache: { ...prevState.cache, [fetchUrl]: data },
      }));
      return data;
    },
    [state.cache, setState]
  );

  const updateDataListsState = useCallback(
    async (countryChanged: boolean) => {
      const initialState: {
        cityOptionsArr: JSX.Element[];
        regions?: Record<string, string>;
        regionOptionsArr?: JSX.Element[];
      } = {
        cityOptionsArr: [],
        ...(countryChanged && { regions: {}, regionOptionsArr: [] }),
      };

      if (!COUNTRIES[location.country]) {
        setState((prevState) => ({ ...prevState, ...initialState }));
        return;
      }

      try {
        const countryCode = COUNTRIES[location.country];

        if (countryChanged) {
          const fetchedRegions: APIRegion[] = await fetchData({ countryCode });
          const newRegions = fetchedRegions.reduce(
            (acc: Record<string, string>, region: APIRegion) => {
              acc[region.name] = region.iso2;
              return acc;
            },
            {}
          );

          setState((prevState) => ({
            ...prevState,
            regions: newRegions,
            regionOptionsArr: fetchedRegions.map((regionData) => (
              <option value={regionData.name} key={regionData.id} />
            )),
            cityOptionsArr: [],
          }));
        } else if (
          location.region &&
          state.regions[location.region] &&
          !state.cache[`${countryCode}/${location.region}`]
        ) {
          const fetchedCities: APICity[] = await fetchData({
            countryCode,
            regionCode: state.regions[location.region],
          });

          setState((prevState) => ({
            ...prevState,
            cityOptionsArr: fetchedCities.map((cityData) => (
              <option value={cityData.name} key={cityData.id} />
            )),
          }));
        }
      } catch (error) {
        console.error(
          `Couldn't fetch ${countryChanged ? "regions" : "cities"}`,
          error
        );
        setState((prevState) => ({ ...prevState, ...initialState }));
      }
    },
    [location, state.cache, state.regions, fetchData]
  );

  useEffect(() => {
    if (COUNTRIES[location.country]) updateDataListsState(true);
  }, [location.country]);

  useEffect(() => {
    if (COUNTRIES[location.country] && state.regions[location.region]) {
      updateDataListsState(false);
    }
  }, [location.region, state.regions]);

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
      dataListOptions: state.regionOptionsArr,
    },
    {
      labelText: "City:",
      inputId: "city",
      name: "city",
      autoCapitalize: "words",
      value: location.city,
      placeholder: "Montevideo",
      dataListId: "region-cities-list",
      dataListOptions: state.cityOptionsArr,
    },
    {
      labelText: "Address:",
      inputId: "address",
      name: "address",
      placeholder: "Made-up street 123",
      autoCapitalize: "off",
      value: location.address,
    },
    {
      labelText: "Postal code:",
      inputId: "postal-code",
      name: "postalCode",
      autoCapitalize: "off",
      value: location.postalCode,
      placeholder: "11500",
    },
  ].map((inputData, index) => (
    <LocationSelectorInput
      {...inputData}
      handleChange={handleChange}
      key={index}
    />
  ));

  return (
    <fieldset className="border-double border-2 border-darkseagreen box-border p-4 gap-3">
      <legend>Location:</legend>
      {inputs}
    </fieldset>
  );
}

export default LocationSelector;
