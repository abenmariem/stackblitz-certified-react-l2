import * as React from 'react';
import { Question } from './Responses';
import { QuizResultItemComponent } from './QuizResultItemComponent';

export interface QuestionResultProps {
  inputQuestions: Question[];
  answers: string[];
  scrambledAnswers(question: Question): string[];
}

export const QuizResultComponent = ({
  inputQuestions,
  answers,
  scrambledAnswers,
}: QuestionResultProps) => {
  console.log('questions in QuizResultComponent', inputQuestions);
  console.log('answers in QuizResultComponent', answers);
  if (
    !inputQuestions ||
    inputQuestions.length == 0 ||
    !answers ||
    answers.length == 0
  ) {
    return null;
  }

  // const answerList: string[]= answers;

  return (
    <>
      {inputQuestions.map((question) => {
        return (
          <div>
            <h2
              key={question.question}
              className="tick"
              dangerouslySetInnerHTML={{ __html: question.question }}
            />
            {answers.map((answer: string) => {
              return (
                <QuizResultItemComponent
                  inputQuestion={question}
                  userAnswer={answer}
                  scrambledAnswers={scrambledAnswers}
                />
              );
            })}
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
    </>
  );
};
