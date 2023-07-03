import * as React from 'react';
import { Question } from './Responses';

export interface QuestionListProps {
  questions: Question[];
}

export const QuizComponent = ({ questions }: QuestionListProps) => {
  console.log('question list QuizComponent', questions);

  if (questions.length == 0) {
    return <div> Empty Quiz </div>;
  }

  return (
    <>
      <div>
        {questions.map((question) => {
          return (
            <h2 key={question.question}>
              {question.question}
              {[...question.correct_answer].map((answer) => (
                <button> {answer}</button>
              ))}
              ;
            </h2>
          );
        })}
      </div>
    </>
  );
};
