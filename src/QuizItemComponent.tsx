import * as React from 'react';
import { Question } from './Responses';

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

  const [question, setQuestion] = React.useState(inputQuestion);

  if (!question) {
    return null;
  }

  const scrambledArrayAnswers = scrambledAnswers(question);

  const selectAnswerHandler = (evt) => {
    evt.preventDefault();
    evt.target.classList.toggle('active');
    onSelectAnswer(evt.currentTarget.value);
  };

  return (
    <>
      <div>
        {scrambledArrayAnswers &&
          scrambledArrayAnswers.map((answer) => (
            <button
              key={answer}
              value={answer}
              className="aternativeButton tick"
              onClick={selectAnswerHandler}
            >
              {answer}
            </button>
          ))}
      </div>
    </>
  );
};
