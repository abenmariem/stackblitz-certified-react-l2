import * as React from 'react';
import { QuizItemComponent } from './QuizItemComponent';
import { Question } from './Responses';

export interface QuizProps {
  questions: Question[];
  answers: string[];
  quizSubmitted: boolean;
  onSelectAnswer(data: string): void;
  onQuizSubmitted(data: boolean): void;
}

export const QuizComponent = ({
  questions,
  answers,
  onSelectAnswer,
  onQuizSubmitted,
  quizSubmitted,
}: QuizProps) => {
  console.log('question list QuizComponent', questions);

  console.log('answer list QuizComponent', answers);

  if (questions.length == 0) {
    return null;
  }

  const handleQuizSubmitted = (evt) => {
    evt.preventDefault();
    onQuizSubmitted(true);
  };

  return (
    <>
      <div style={{ display: quizSubmitted ? 'none' : 'block' }}>
        {questions.map((question) => {
          return (
            <div>
              <h2
                key={question.question}
                className="tick"
                dangerouslySetInnerHTML={{ __html: question.question }}
              />

              <QuizItemComponent
                inputQuestion={question}
                onSelectAnswer={onSelectAnswer}
              />
            </div>
          );
        })}
        <div className="submitAnswersContainer">
          <button
            className="submitAnswersButton"
            style={{ display: answers.length < 5 ? 'none' : 'block' }}
            onClick={handleQuizSubmitted}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
