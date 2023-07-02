import * as React from 'react';
import { Question } from './Responses';

export const QuestionComponent = ({ question }) => {
  console.log('question QuestionComponent', question);
  return <h2> {question.question}</h2>;
};
