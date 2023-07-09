import * as React from 'react';
import { Question } from './Responses';
import { AnswerButton } from './AnswerButtonComponent';

export interface QuestionItemProps {
  inputQuestion: Question;
  onSelectAnswer(data: string): void;
  scrambledAnswers(question: Question): string[];
}

export const QuizItemComponent = ({
  inputQuestion,
  onSelectAnswer,
  scrambledAnswers,
}: QuestionItemProps) => {
  console.log('question in QuizItemComponent', inputQuestion);

  if (!inputQuestion) {
    return null;
  }

  let disabledNonSelectedAnswers = false;

  const scrambledArrayAnswers = scrambledAnswers(inputQuestion);

  const selectAnswerHandler = (evt, value) => {
    //  console.log('event in QuizItemComponent ', evt);

    // evt.preventDefault();
    if (disabledNonSelectedAnswers) {
      return;
    }
    evt.target.classList.toggle('active');
    disabledNonSelectedAnswers = true;
    console.log('selected answer ', value);
    onSelectAnswer(value);
  };

  let buttonAnswers = scrambledArrayAnswers.map((answer, index) => (
    <AnswerButton
      key={answer}
      value={answer}
      className="aternativeButton tick"
      handleClick={selectAnswerHandler}
      index={index}
      disabledNonSelectedAnswers={disabledNonSelectedAnswers}
    />
  ));

  const [alternativesButtons, setAlternativesButtons] =
    React.useState(buttonAnswers);

  return (
    <>
      <div>{scrambledArrayAnswers && alternativesButtons}</div>
    </>
  );
};
