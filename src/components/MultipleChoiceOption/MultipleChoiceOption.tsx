import React from 'react';
import { Contents, Option, OptionContainer, OptionShadow } from './styles';

interface MultipleChoiceOptionProps {
  selected: boolean;
  contents: string;
  disabled?: boolean;
  onPress: () => void;
}

const MultipleChoiceOption: React.FC<MultipleChoiceOptionProps> = ({
  selected,
  contents,
  disabled = false,
  onPress,
}) => {
  return (
    <OptionContainer onPress={onPress} disabled={disabled}>
      <Option selected={selected}>
        <Contents selected={selected}>{contents}</Contents>
      </Option>
      <OptionShadow selected={selected} />
    </OptionContainer>
  );
};

export default MultipleChoiceOption;
