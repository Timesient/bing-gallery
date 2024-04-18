import { useState, useEffect } from "react";
import Selector from "./Selector";

export default function CountrySelector({
  selectOnChangeHandler
}: {
  selectOnChangeHandler: Function
}) {
  const [countries, setCountries] = useState(['Global']);

  useEffect(() => {
    fetch(`${location.protocol}//${location.hostname}:23457/api/getCountries`)
      .then(res => res.json())
      .then(json => setCountries(['Global'].concat(json.data)));
  }, []);

  return (
    <Selector
      defaultOption="Global"
      options={countries}
      optionOnClickHandler={selectOnChangeHandler}
    />
  );
}