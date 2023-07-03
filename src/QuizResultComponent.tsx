import * as React from 'react';
import { Question } from './Responses';

export interface QuestionResultProps {
  inputQuestions: Question[];
  answers: string[];
}

export const QuizResultComponent = ({
  inputQuestions,
  answers,
}: QuestionResultProps) => {
  console.log('question in QuizResultComponent', inputQuestions);
  console.log('answers in QuizResultComponent', answers);
  if (!inputQuestions || !answers) {
    return null;
  }

  return (
    <>
      <div>
        <h2> Result Quiz </h2>
        {
        
        
        
        /*answers.map((answer) => (
          <button
            key={answer}
            value={answer}
            className="aternativeButton tick active"
          >
            {answer}
          </button>
        ))*/}
      </div>
    </>
  );
};
