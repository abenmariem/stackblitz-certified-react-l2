import * as React from 'react';
import { Question } from './Responses';

export interface QuestionResultItemProps {
  inputQuestion: Question;
  answers: string[];
}

export const QuizResultItemComponent = ({
  inputQuestion,
  answers,
}: QuestionResultItemProps) => {
  console.log('question in QuizItemComponent', inputQuestion);

  if (!inputQuestion) {
    return null;
  }

  return (
    <>
      <div>
        {answers &&
          answers.map((userAnswer) => (

           {userAnswer === inputQuestion.correct_answer ?
            <button
            key={userAnswer}
            value={userAnswer}
            className="aternativeButton tick active"
            //  onClick={selectAnswerHandler}
          >
            {userAnswer}
          </button> : <button
          key={userAnswer}
          value={userAnswer}
          className="aternativeButton tick active"
          //  onClick={selectAnswerHandler}
        >
          {userAnswer}
        </button>
           
          ))}
      </div>
    </>
  );
};
