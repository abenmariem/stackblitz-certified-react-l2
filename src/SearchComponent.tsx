import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import * as Style from './SearchComponent.module.css';
import { Category, CategoryListResponse, Question, Quiz } from './Responses';
import { QuestionComponent } from './QuestionComponent';

export const SearchComponent = () => {
  const [categoryList, setCategoryList] = useState([]);

  const [categoryListLoading, setCategoryListLoading] = useState(false);

  const [questionListLoading, setQuestionListLoading] = useState(false);

  const [questionList, setQuestionList] = useState([]);

  const [requestParams, setRequestParams] = useState({
    category: '',
    difficulty: '',
  });

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

    console.log('questions', questions);

    setQuestionList([...questions]);
    setQuestionListLoading(false);
  };

  const memoisedFetchQuiz = React.useCallback(fetchQuiz, [requestParams]);

  useEffect(() => {
    memoisedFetchCategory();
  }, []);

  useEffect(() => {
    memoisedFetchQuiz();
  }, [requestParams]);

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
            className={Style.searchSelect}
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
            className={Style.searchSelect}
          >
            <option value="" disabled selected>
              Select a difficulty
            </option>
            <option value="easy"> easy </option>
            <option value="medium"> medium </option>
            <option value="hard"> hard </option>
          </select>

          <button className={Style.searchButton}>Create</button>
        </form>
      )}

      {questionListLoading ? (
        <div>Loading ...</div>
      ) : (
        questionList.map((q) => {
          <QuestionComponent question={q} />;
        })
      )}
    </>
  );
};
