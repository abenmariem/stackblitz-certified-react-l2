import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { Category, CategoryListResponse, Question, Quiz } from './Responses';
import { QuizComponent } from './QuizComponent';
import { QuizResultComponent } from './QuizResultComponent';
import Chance from 'chance';

export const SearchComponent = () => {
  const [categoryList, setCategoryList] = useState([]);

  const [categoryListLoading, setCategoryListLoading] = useState(false);

  const [questionListLoading, setQuestionListLoading] = useState(false);

  const [questionList, setQuestionList] = useState<Array<Question>>([]);

  const [answerList, setAnswerList] = useState<Array<string>>([]);

  const [requestParams, setRequestParams] = useState({
    category: '',
    difficulty: '',
  });

  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  

  const getScrambledArrayAnswers: (question: Question, seed:number) => string[] = (questionToScramble: Question, seed:number) => {
    const answersArray: string[] = [...questionToScramble.incorrect_answers, questionToScramble.correct_answer];
    const chance1 = new Chance(seed);
    return chance1.shuffle(answersArray);
  };

  const fetchCategories = async () => {
    setCategoryListLoading(true);
    const categories = await fetch('https://opentdb.com/api_category.php');

    if (!categories.ok) {
      setCategoryListLoading(false);
      throw new Error('Error fetching categories');
    }

    const result: CategoryListResponse = await categories.json();

    setCategoryList(result.trivia_categories);
    setCategoryListLoading(false);
  };

  const memoisedFetchCategory = React.useCallback(fetchCategories, []);

  const fetchQuiz = async () => {
    console.log('requestParams', requestParams);
    if (!requestParams.category || !requestParams.difficulty) {
      return;
    }
    setQuestionListLoading(true);
    const url = `https://opentdb.com/api.php?amount=5&category=${requestParams.category}&difficulty=${requestParams.difficulty}&type=multiple`;

    console.log('url', url);

    const quiz = await fetch(url);

    if (!quiz.ok) {
      setQuestionListLoading(false);
      throw new Error('Error fetching quiz');
    }

    const quizResponse: Quiz = await quiz.json();

    const questions: Array<Question> = quizResponse?.results;

    questions.forEach(question => {
         const seed = randomInteger(1, 100);
         question.scrambled_answers= getScrambledArrayAnswers(question, seed);
    });

    console.log('questions', questions);

    setQuestionList([...questions]);
    setQuestionListLoading(false);
  };

  useEffect(() => {
    memoisedFetchCategory();
  }, []);

  useEffect(() => {
    fetchQuiz();
  }, [requestParams]);


  const handleAnswerSelection = (answer: string) => {
    setAnswerList((oldList) => [...oldList, answer]);
  };




  return (
    <>
      <h2> Quiz Maker</h2>

      {categoryListLoading ? (
        <div>Loading ...</div>
      ) : (
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            const formData = new FormData(evt.currentTarget);
            const obj = {
              category: formData.get('category')?.toString() ?? '',
              difficulty: formData.get('difficulty')?.toString() ?? '',
            };
            setRequestParams(obj);
          }}
        >
          <select
            id="categorySelect"
            name="category"
            className='searchSelect'
          >
            <option value="" disabled selected>
              Select a Category
            </option>
            {categoryList &&
              categoryList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>

          <select
            id="difficultySelect"
            name="difficulty"
            className='searchSelect'
          >
            <option value="" disabled selected>
              Select a difficulty
            </option>
            <option value="easy"> easy </option>
            <option value="medium"> medium </option>
            <option value="hard"> hard </option>
          </select>

          <button className='searchButton'>Create</button>

          {quizSubmitted ? <QuizResultComponent  inputQuestions={...questionList} answers={...answerList}  onGenerateQuiz ={setQuizSubmitted} setQuestionList={setQuestionList} setAnswerList={setAnswerList} /> : <QuizComponent questions={...questionList} onSelectAnswer={handleAnswerSelection} onQuizSubmitted={setQuizSubmitted}  answers={...answerList} quizSubmitted={quizSubmitted}/>} 
          
        </form>
      )}

    </>
  );
};
