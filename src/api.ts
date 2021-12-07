const BASE_URL = `https://api.coinpaprika.com/v1`;

const fetchCoins = () => {
  return fetch(`${BASE_URL}/coins`).then(resp => resp.json());
};

const fetchCoinInfo = (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then(resp => resp.json());
};

const fetchCoinTickers = (coinId: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then(resp => resp.json());
};

const fetchCoinHistory = (coinId: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;

  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then(resp => resp.json());
};

export { fetchCoins, fetchCoinInfo, fetchCoinTickers, fetchCoinHistory };
