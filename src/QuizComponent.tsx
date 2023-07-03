import * as React from 'react';
import { QuizItemComponent } from './QuizItemComponent';
import { Question } from './Responses';

export interface QuestionListProps {
  questions: Question[];
}

export const QuizComponent = ({ questions }: QuestionListProps) => {
  console.log('question list QuizComponent', questions);

  const [answerList, setAnswerList] = React.useState([]);

  if (questions.length == 0) {
    return null;
  }

  const submitAnswers = () => {
    questions.forEach((question) => {
      answerList.forEach((answer) => {});
    });
  };

  const handleAnswerSelection = (answer: string) => {
    setAnswerList([...answerList, answer]);
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
                onSelectAnswer={handleAnswerSelection}
              />
            </div>
          );
        })}
        <div className="submitAnswersContainer">
          <button
            className="submitAnswersButton"
            style={{ display: answerList.length != 5 ? 'none' : 'block' }}
            onClick={submitAnswers}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
