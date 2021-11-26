import React from 'react';
import { Contents, Option, OptionContainer, OptionShadow } from './styles';

interface MultipleChoiceOptionProps {
  selected: boolean;
}

const MultipleChoiceOption: React.FC<MultipleChoiceOptionProps> =
  function MultipleChoiceOption({ selected }) {
  return (
      <OptionContainer>
      <Option selected={selected}>
          <Contents selected={selected}>asdsad</Contents>
        </Option>
      <OptionShadow selected={selected} />
    </OptionContainer>
  );
};

export default MultipleChoiceOption;
