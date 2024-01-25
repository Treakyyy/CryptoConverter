import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CryptoConverter.css'

const CryptoConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [sourceCurrency, setSourceCurrency] = useState<string>('USDT');
  const [targetCurrency, setTargetCurrency] = useState<string>('BTC');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${sourceCurrency}${targetCurrency}`);
        setExchangeRate(parseFloat(response.data.price));
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, [sourceCurrency, targetCurrency]);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleSourceCurrencyChange = (currency: string) => {
    setSourceCurrency(currency);
  };

  const handleTargetCurrencyChange = (currency: string) => {
    setTargetCurrency(currency);
  };

  const handleSwapCurrencies = () => {
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
  };

  const convertedAmount = exchangeRate !== null ? amount * exchangeRate : 0;

  return (
    <div className="Converter-Inputs">
      <div className="Converter-Input">
        <span className="Symbol">$ →</span>
          <input
            className="Textinput-Control"
            maxLength={8}
            value={amount}
            onChange={handleAmountChange}
          />
      </div>
      <button
        className="Converter-Button"
        onClick={handleSwapCurrencies}
      >
        Конвертировать
      </button>
      <div className="Converter-Input">
        <span className="Symbol">₿ →</span>
          <input
            className="Textinput-Control"
            maxLength={20}
            value={convertedAmount.toFixed(2)}
            readOnly
          />
      </div>
    </div>
  );
};

export default CryptoConverter;






