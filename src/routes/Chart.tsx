import { useQuery } from 'react-query';
import { fetchCoinHistory } from 'api';
import ApexChart from 'react-apexcharts';
import type { FunctionComponent } from 'react';

interface CharProps {
  coindId: string;
}

interface IHistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart: FunctionComponent<CharProps> = ({ coindId }) => {
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ['ohlcv', coindId],
    () => fetchCoinHistory(coindId)
  );

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: 'Price',
              data: data?.map(price => ({
                x: price.time_close,
                y: [
                  price.open.toFixed(2),
                  price.high.toFixed(2),
                  price.low.toFixed(2),
                  price.close.toFixed(2),
                ],
              })),
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              height: 300,
              width: 500,
              background: 'transparent',
              toolbar: {
                show: false,
              },
            },
            stroke: {
              curve: 'smooth',
              width: 5,
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              type: 'datetime',
            },
            colors: ['#0fbcf9'],
            tooltip: {
              y: {
                formatter: value => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
