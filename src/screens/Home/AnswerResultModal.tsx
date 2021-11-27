import React from 'react';
import { Modal } from 'react-native';
import SelectResultContainer from '@components/SelectResultContainer';
import { AnswerResultModalContainer } from './styles';

interface AnswerResultModalProps {
  visible: boolean;
  isCorrect: boolean;
  correctAnswer: string;
  onPress: () => void;
}

const AnswerResultModal: React.FC<AnswerResultModalProps> = ({
  visible,
  isCorrect,
  correctAnswer,
  onPress,
}) => {
  return (
    <Modal animationType="slide" visible={visible} transparent>
      <AnswerResultModalContainer>
        <SelectResultContainer
          isCorrect={isCorrect}
          correctAnswer={!isCorrect ? correctAnswer : null}
          onPress={onPress}
        />
      </AnswerResultModalContainer>
    </Modal>
  );
};

export default AnswerResultModal;
