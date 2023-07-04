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

  const getUserButton = (
    questionAnswer: string,
    inputQuestion: Question,
    index: number
  ) => {
    if (questionAnswer === answers[index]) {
      return (
        <button
          key={questionAnswer}
          value={questionAnswer}
          className="resultButtonCorrect"
          disabled={true}
        >
          {questionAnswer}
        </button>
      );
    } else if (questionAnswer === inputQuestion.correct_answer) {
      //the answer is correct and is not the answer of the user
      return (
        <button
          key={questionAnswer}
          value={questionAnswer}
          className="resultButtonIncorrect"
          disabled={true}
        >
          {questionAnswer}
        </button>
      );
    } else {
      return (
        <button
          key={questionAnswer}
          value={questionAnswer}
          className="resultButtonNotSelected"
          disabled={true}
        >
          {questionAnswer}
        </button>
      );
    }
  };

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
            {scrambledAnswers(question).map(
              (questionAnswer: string, index: number) => {
                return getUserButton(questionAnswer, question, index);
              }
            )}
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
