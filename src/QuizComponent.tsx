import * as React from 'react';
import { QuizItemComponent } from './QuizItemComponent';
import { Question } from './Responses';

export interface QuestionListProps {
  questions: Question[];
}

export const QuizComponent = ({ questions }: QuestionListProps) => {
  console.log('question list QuizComponent', questions);

  if (questions.length == 0) {
    return null;
  }

  return (
    <>
      <div>
        {questions.map((question) => {
          return (
            <h2 key={question.question}>
              {question.question}
              <QuizItemComponent inputQuestion={question} />
            </h2>
          );
        })}
      </div>
    </>
  );
};
