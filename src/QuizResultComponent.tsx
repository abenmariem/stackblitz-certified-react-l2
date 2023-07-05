import * as React from 'react';
import { Question } from './Responses';
import { QuizResultItemComponent } from './QuizResultItemComponent';

export interface QuestionResultProps {
  inputQuestions: Question[];
  answers: string[];
  scrambledAnswers(question: Question): string[];
  onGenerateQuiz(data: boolean): void;
  setQuestionList(questions: Question[]): void;
}

export const QuizResultComponent = ({
  inputQuestions,
  answers,
  scrambledAnswers,
  onGenerateQuiz,
  setQuestionList,
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
          value={questionAnswer}
          className="resultButtonCorrect"
          disabled={true}
        >
          {questionAnswer}
        </button>
      );
    } else if (
      questionAnswer != answers[index] &&
      questionAnswer === inputQuestion.correct_answer
    ) {
      //the answer is correct and is not the answer of the user
      return (
        <button
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
          value={questionAnswer}
          className="resultButtonNotSelected"
          disabled={true}
        >
          {questionAnswer}
        </button>
      );
    }
  };

  const handleRegenerateQuiz = (evt) => {
    evt.preventDefault();
    onGenerateQuiz(false);
    setQuestionList([]);
  };

  return (
    <>
      {inputQuestions.map((question, index) => {
        return (
          <div>
            <h2
              key={question.question}
              className="tick"
              dangerouslySetInnerHTML={{ __html: question.question }}
            />
            {scrambledAnswers(question).map(
              (questionAnswer: string, answerIndex) => {
                return (
                  <span key={index + '_' + answerIndex}>
                    {getUserButton(questionAnswer, question, index)}
                  </span>
                );
              }
            )}
          </div>
        );
      })}
      <div className="submitAnswersContainer">
        <button className="submitAnswersButton" onClick={handleRegenerateQuiz}>
          Create a new Quiz
        </button>
      </div>
    </>
  );
};
