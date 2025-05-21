// useExchangeRates.ts
import { useEffect, useState } from "react";

const API_KEY = "56979d1a5fbca8521a5de76a6691a6ae";
const BASE_CURRENCY = "USD";

const useExchangeRates = () => {
  const [rates, setRates] = useState({ CAD: 1, EUR: 1, USD: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(
          `https://api.exchangeratesapi.io/latest?base=${BASE_CURRENCY}&apikey=${API_KEY}`
        );
        const data = await res.json();
        if (!data.rates) {
          setRates({
            CAD: data.rates.CAD || 1.36,
            EUR: data.rates.EUR || 0.91,
            USD: 1,
          });
        }
      } catch {
            // Fallback mock rates
        setRates({ CAD: 1.36, EUR: 0.91, USD: 1 });
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return { rates, loading };
};

export default useExchangeRates;
