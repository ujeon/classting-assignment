import React from 'react';
import renderer from 'react-test-renderer';
import MultipleChoiceOption from '@components/MultipleChoiceOption';

test('[MultipleChoiceOption] render:', () => {
  const tree = renderer
    .create(<MultipleChoiceOption selected onPress={() => {}} contents="테스트 문구" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
