import React from 'react';
import { Contents, Option, OptionContainer, OptionShadow } from './styles';

interface MultipleChoiceOptionProps {
  selected: boolean;
  contents: string;
}

const MultipleChoiceOption: React.FC<MultipleChoiceOptionProps> = ({ selected, contents }) => {
  return (
    <OptionContainer>
      <Option selected={selected}>
        <Contents selected={selected}>{contents}</Contents>
      </Option>
      <OptionShadow selected={selected} />
    </OptionContainer>
  );
};

export default MultipleChoiceOption;
