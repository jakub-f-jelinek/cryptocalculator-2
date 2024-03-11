import { useDispatch } from "react-redux";
import { api } from "../redux/api";
import { useState } from "react";
import { useFetchDataQuery } from "../redux/api";

export const CurrencySwitcher = () => {
  const dispatch = useDispatch();

  const [currency, setCurrency] = useState("usd");

  const { data, error, isLoading } = useFetchDataQuery();
  // const { data:  } = useFetchDataCurrencyQuery();
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCurrencySwitch = (e) => {
    let newCurrency = e.target.value;
    console.log(newCurrency);

    // dispatch(api.endpoints.fetchData.initiate(newCurrency));
  };

  return (
    <div>
      <div>currencySwitcher</div>
      <select name="currencySwitcher" onChange={handleCurrencySwitch}>
        <option value="czk">czk</option>
        <option value="usd">usd</option>
      </select>
    </div>
  );
};
