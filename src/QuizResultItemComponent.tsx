import * as React from 'react';
import { Question } from './Responses';

export interface QuestionResultItemProps {
  inputQuestion: Question;
  userAnswer: string;
  scrambledAnswers(question: Question): string[];
}

export const QuizResultItemComponent = ({
  inputQuestion,
  userAnswer,
  scrambledAnswers,
}: QuestionResultItemProps) => {
  console.log('question in QuizResultItemComponent', inputQuestion);
  console.log('answers in QuizResultItemComponent', userAnswer);

  if (!inputQuestion || !userAnswer) {
    console.log('null is returned');
    return null;
  }

  const getUserButton = (userAnswer: string) => {
    if (inputQuestion.correct_answer === userAnswer) {
      console.log('user response is correct', userAnswer);
      return (
        <button
          key={userAnswer}
          value={userAnswer}
          className="resultButtonCorrect tick"
        >
          {userAnswer}
        </button>
      );
    } else {
      console.log('user response is incorrect', userAnswer);
      return (
        <button
          key={userAnswer}
          value={userAnswer}
          className="resultButtonNotSelected tick"
        >
          {userAnswer}
        </button>
      );
    }
  };

  const questionScrambledAnswers = scrambledAnswers(inputQuestion);
  console.log(
    'scrambledAnswers in Quiz item component',
    questionScrambledAnswers
  );

  return (
    <>
      <h2> Quiz item component</h2>
      {questionScrambledAnswers.map((questionAnswer) => {
        console.log('button text ', questionAnswer);
        return (
          <button
            key={questionAnswer}
            value={questionAnswer}
            className="resultButtonCorrect tick"
          >
            {questionAnswer}
          </button>
        );
      })}
    </>
  );
};
