import React from 'react';

// cấu trúc một công việc
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

// Hàm tạo một todo mới
export const createNewTodo = (text: string): Todo => {
  return {
    id: Date.now().toString(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now(),
  };
};

// Hàm lọc danh sách 
export const sortTodosByDate = (todos: Todo[]): Todo[] => {
  return [...todos].sort((a, b) => b.createdAt - a.createdAt);
};