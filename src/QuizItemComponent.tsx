import * as React from 'react';
import { Question } from './Responses';

export interface QuestionItemProps {
  inputQuestion: Question;
}

export const QuizItemComponent = ({ inputQuestion }: QuestionItemProps) => {
  console.log('question in QuizItemComponent', inputQuestion);

  const [question, setQuestion] = React.useState(inputQuestion);

  if (!question) {
    return null;
  }

  const getScrambledArrayAnswers = () => {
    const result: string[] = [];
    if (typeof question.correct_answer === 'string') {
      result.push(question.correct_answer);
    }
    if (typeof question.incorrect_answers === 'string') {
      result.push(question.incorrect_answers);
    }

    if (Array.isArray(question.correct_answer)) {
      result.push(...question.correct_answer);
    }

    if (Array.isArray(question.incorrect_answers)) {
      result.push(...question.incorrect_answers);
    }

    return result;
  };

  return (
    <>
      <div>
        {getScrambledArrayAnswers().map((answer) => {
          <button> {answer}</button>;
        })}
      </div>
    </>
  );
};
