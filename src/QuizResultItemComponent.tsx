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

  

  const questionScrambledAnswers = scrambledAnswers(inputQuestion);
  console.log(
    'scrambledAnswers in Quiz item component',
    questionScrambledAnswers
  );

  return <>{}</>;
};
