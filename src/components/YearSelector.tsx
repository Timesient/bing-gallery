import { useState, useEffect } from "react";
import Selector from "./Selector";

export default function YearSelector({
  selectOnChangeHandler
}: {
  selectOnChangeHandler: Function
}) {
  const nowYear = new Date().getFullYear().toString();
  const [years, setYears] = useState([nowYear]);

  useEffect(() => {
    fetch(`${location.protocol}//${location.hostname}:23457/api/getYears`)
      .then(res => res.json())
      .then(json => setYears(json.data));
  }, []);

  return (
    <Selector
      defaultOption={nowYear}
      options={years}
      optionOnClickHandler={selectOnChangeHandler}
    />
  );
}