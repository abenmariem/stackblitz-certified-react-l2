import * as React from 'react';
import { QuizItemComponent } from './QuizItemComponent';
import { Question } from './Responses';

export interface QuestionListProps {
  questions: Question[];
  onSelectAnswer(data: string): void;
  scrambledAnswers(question: Question): string[];
}

export const QuizComponent = ({
  questions,
  onSelectAnswer,
  scrambledAnswers,
}: QuestionListProps) => {
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
                scrambleAnswers= {scrambledAnswers}
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
