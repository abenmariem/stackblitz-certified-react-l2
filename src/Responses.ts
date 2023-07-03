export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Category {
  id: number;
  name: string;
}

export interface CategoryListResponse {
  trivia_categories: Array<Category>;
}

export interface Question {
  category: string;
  type: string;
  difficulty: Difficulty;
  question: string;
  correct_answer: Array<string> | string;
  incorrect_answers: Array<string> | string;
}

export interface Quiz {
  response_code: number;
  results: Array<Question>;
}
