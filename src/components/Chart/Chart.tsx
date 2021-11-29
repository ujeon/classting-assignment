import React, { useState, useEffect } from 'react';
import { VictoryPie } from 'victory-native';
import colors from '@themes/colors';
import { PieContainer, Ratio, RatioContainer } from './styles';

const graphicColor = [colors.kellyGreen, colors.sunsetOrange];

interface ChartProps {
  totalCount: number;
  correctAnswerCount: number;
  inCorrectAnswerCount: number;
}

const Chart: React.FC<ChartProps> = ({ totalCount, correctAnswerCount, inCorrectAnswerCount }) => {
  const [graphicData, setGraphicData] = useState([{ y: 0 }, { y: totalCount }]);

  useEffect(() => {
    setGraphicData([{ y: correctAnswerCount }, { y: inCorrectAnswerCount }]);
  }, [correctAnswerCount, inCorrectAnswerCount]);

  return (
    <PieContainer>
      <VictoryPie
        animate={{ easing: 'exp', duration: 1500 }}
        data={graphicData}
        width={300}
        height={300}
        colorScale={graphicColor}
        innerRadius={65}
        labels={() => null}
      />
      <RatioContainer>
        <Ratio>{`${(correctAnswerCount / totalCount) * 100}%`}</Ratio>
      </RatioContainer>
    </PieContainer>
  );
};

export default Chart;
