import * as React from 'react';
import { Question } from './Responses';
import { QuizResultItemComponent } from './QuizResultItemComponent';

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
        {inputQuestions.map((question) => {
          return (
            <div>
              <h2
                key={question.question}
                className="tick"
                dangerouslySetInnerHTML={{ __html: question.question }}
              />

              <QuizResultItemComponent inputQuestion={question} answers={answers} />
            </div>
          );
        })}
        <div className="submitAnswersContainer">
          <button
            className="submitAnswersButton"
            // onClick={handleRegenerateQuiz}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
