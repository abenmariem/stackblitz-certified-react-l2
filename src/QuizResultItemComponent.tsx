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

  const getUserButton = (questionAnswer: string) => {
    if (questionAnswer === userAnswer) {
      if (userAnswer === inputQuestion.correct_answer) {
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
        // The current answer is user's answer and is incorrect
        //Highlight the correct answer with red background
        return (
          <button
            key={userAnswer}
            value={userAnswer}
            className="resultButtonIncorrect tick"
          >
            {userAnswer}
          </button>
        );
      }
      console.log('user response is correct', userAnswer);
    } else {
      //The current answer isn't user's answer
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
      {questionScrambledAnswers.map((questionAnswer) => {
        console.log('button text ', questionAnswer);
        return getUserButton(questionAnswer);
      })}
    </>
  );
};
