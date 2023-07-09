import * as React from 'react';
import { Question } from './Responses';

export interface QuestionResultProps {
  inputQuestions: Question[];
  answers: string[];
  scrambledAnswers(question: Question): string[];
  onGenerateQuiz(data: boolean): void;
  setQuestionList(questions: Question[]): void;
  setAnswerList(answerList: string[]): void;
}

export const QuizResultComponent = ({
  inputQuestions,
  answers,
  scrambledAnswers,
  onGenerateQuiz,
  setQuestionList,
  setAnswerList,
}: QuestionResultProps) => {
  console.log('questions in QuizResultComponent', inputQuestions);
  console.log('answers in QuizResultComponent', answers);

  let numberCorrectAnswers = 0;

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
      if (questionAnswer == inputQuestion.correct_answer) {
        numberCorrectAnswers++;
      }

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
    setAnswerList([]);
  };

  const getResultCssClass = () => {
    let className = 'noResult';
    switch (numberCorrectAnswers) {
      case 0:
        className = 'redResult';
        break;
      case 1:
        className = 'redResult';
        break;
      case 2:
        className = 'yellowResult';
        break;
      case 3:
        className = 'yellowResult';
        break;
      case 4:
        className = 'greenResult';
        break;
      case 4:
        className = 'greenResult';
        break;
      default:
        className = 'noResult';
        break;
    }
    return className;
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

      <div className={getResultCssClass()}>
        You scored {numberCorrectAnswers} out of 5
      </div>
      <div className="submitAnswersContainer">
        <button className="submitAnswersButton" onClick={handleRegenerateQuiz}>
          Create a new Quiz
        </button>
      </div>
    </>
  );
};
