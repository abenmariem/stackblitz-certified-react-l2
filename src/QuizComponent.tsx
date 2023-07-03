import * as React from 'react';
import { QuizItemComponent } from './QuizItemComponent';
import { Question } from './Responses';

export interface QuizProps {
  questions: Question[];
  answers: string[];
  onSelectAnswer(data: string): void;
  onQuizSubmitted(data: boolean): void;
  scrambledAnswers(question: Question): string[];
}

export const QuizComponent = ({
  questions,
  answers,
  onSelectAnswer,
  onQuizSubmitted,
  scrambledAnswers,
}: QuizProps) => {
  console.log('question list QuizComponent', questions);

  if (questions.length == 0) {
    return null;
  }

  const handleQuizSubmitted = () => {
    onQuizSubmitted(true);
  };

  return (
    <>
      <div>
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
                scrambledAnswers={scrambledAnswers}
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
