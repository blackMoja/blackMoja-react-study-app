import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoinHistory } from 'api';

import type { FunctionComponent } from 'react';

interface PriceProps {
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #353b48;

  width: 100%;
  padding: 16px 12px;
  border-radius: 10px;
`;

const PriceTitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  padding: 12px 0;
`;

const Title = styled.span`
  font-weight: 500;
`;

const Info = styled.span<{ $sign: 'plus' | 'minus' }>`
  color: ${props => (props.$sign === 'plus' ? '#e84118' : '#0097e6')};
  font-weight: 600;
`;

const Price: FunctionComponent<PriceProps> = ({ coindId }) => {
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ['price', coindId],
    () => fetchCoinHistory(coindId)
  );

  if (!data) {
    return null;
  }

  const diffData = data.slice(-2).map(({ open, close, high, low }) => {
    return {
      close: Math.floor(close),
      high: Math.floor(high),
      low: Math.floor(low),
      open: Math.floor(open),
    };
  });

  const getPercentage = (prev: number, current: number) => {
    return ((current - prev) / current) * 100;
  };

  const percentageText = (percent: number) => {
    return;
  };

  const openPercentage = getPercentage(diffData[0].open, diffData[1].open);
  const closePercentage = getPercentage(diffData[0].close, diffData[1].close);
  const highPercentage = getPercentage(diffData[0].high, diffData[1].high);
  const lowPercentage = getPercentage(diffData[0].low, diffData[1].low);

  return (
    <div>
      {isLoading ? (
        'Loading Price...'
      ) : (
        <Wrapper>
          <PriceTitle>Today's price compared to yesterday. 🪙</PriceTitle>
          <PriceContainer>
            <Title>open</Title>
            <Info $sign={Math.sign(openPercentage) === 1 ? 'plus' : 'minus'}>
              {openPercentage.toFixed(2)}%
            </Info>
          </PriceContainer>
          <PriceContainer>
            <Title>high</Title>
            <Info $sign={Math.sign(highPercentage) === 1 ? 'plus' : 'minus'}>
              {highPercentage.toFixed(2)}%
            </Info>
          </PriceContainer>
          <PriceContainer>
            <Title>low</Title>
            <Info $sign={Math.sign(lowPercentage) === 1 ? 'plus' : 'minus'}>
              {lowPercentage.toFixed(2)}%
            </Info>
          </PriceContainer>
          <PriceContainer>
            <Title>close</Title>
            <Info $sign={Math.sign(closePercentage) === 1 ? 'plus' : 'minus'}>
              {closePercentage.toFixed(2)}%
            </Info>
          </PriceContainer>
        </Wrapper>
      )}
    </div>
  );
};

export default Price;
