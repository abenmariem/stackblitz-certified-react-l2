import * as React from 'react';

export const QuestionComponent = ({ question, type }) => {
  console.log('question QuestionComponent', question);
  return (
    <>
      <h2> {question}</h2>
      <p> {type}</p>
    </>
  );
};
