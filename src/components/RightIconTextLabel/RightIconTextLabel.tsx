import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { Icon, IconWithContent, Label, LabelContainer, Content } from './styles';

interface RightIconTextLabelProps {
  content: string;
  contentColor: string;
  source: ImageSourcePropType;
  title: string;
}

const RightIconTextLabel: React.FC<RightIconTextLabelProps> = ({
  content,
  contentColor,
  source,
  title,
}) => {
  return (
    <LabelContainer>
      <Label>{title}</Label>
      <IconWithContent>
        <Icon source={source} />
        <Content color={contentColor}>{content}</Content>
      </IconWithContent>
    </LabelContainer>
  );
};

export default RightIconTextLabel;
