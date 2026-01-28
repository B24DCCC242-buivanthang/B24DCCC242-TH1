import { useState, useEffect } from 'react';
import { Todo, createNewTodo } from './todoLogic';

const LOCAL_STORAGE_KEY = 'UMI_TODO_APP_DATA';

export const useTodoStore = () => {
  // Đọc dữ liệu từ LocalStorage khi khởi tạo
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Tự động lưu vào LocalStorage mỗi khi mảng todo thay đổi
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim() === '') return;
    setTodos((prev) => [createNewTodo(text), ...prev]);
  };
  // thêm công việc

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id));
  };
  //xóa công việc

  const toggleStatus = (id: string) => {
    setTodos((prev) => 
      prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
  };
  // thay đổi trạng thái cv

  const updateTodoText = (id: string, newText: string) => {
    setTodos((prev) => 
      prev.map(todo => todo.id === id ? { ...todo, text: newText } : todo)
    );
  };
  // chỉnh sửa

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleStatus,
    updateTodoText
  };
};