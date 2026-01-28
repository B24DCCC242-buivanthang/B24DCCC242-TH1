import React, { useState } from 'react';
import { useTodoStore } from './todoStore';

const TodoApp: React.FC = () => {
  const { todos, addTodo, deleteTodo, toggleStatus, updateTodoText } = useTodoStore();
  const [inputValue, setInputValue] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempEditText, setTempEditText] = useState<string>('');

  const handlePressAdd = () => {
    addTodo(inputValue);
    setInputValue('');
  };
  //hàm thêm

  const startEditing = (id: string, currentText: string) => {
    setEditingId(id);
    setTempEditText(currentText);
  };
  //hàm sửa

  const saveEdit = (id: string) => {
    updateTodoText(id, tempEditText);
    setEditingId(null);
  };
  //hàm lưu sửa

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}> TodoList </h1>
      
      {/* Input thêm mới */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
          placeholder="Công việc hôm nay?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handlePressAdd()}
        />
        <button 
          onClick={handlePressAdd}
          style={{ padding: '0 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Thêm
        </button>
      </div>

      {/* Danh sách Todo */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {todos.map((todo) => (
          <div 
            key={todo.id} 
            style={{ 
              display: 'flex', alignItems: 'center', padding: '15px', 
              backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleStatus(todo.id)}
              style={{ width: '20px', height: '20px', marginRight: '15px', cursor: 'pointer' }}
            />

            {editingId === todo.id ? (
              <div style={{ flex: 1, display: 'flex', gap: '5px' }}>
                <input 
                  autoFocus
                  style={{ flex: 1, padding: '5px' }}
                  value={tempEditText}
                  onChange={(e) => setTempEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)}>Lưu</button>
              </div>
            ) : (
              <span style={{ 
                flex: 1, 
                fontSize: '16px',
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#aaa' : '#333'
              }}>
                {todo.text}
              </span>
            )}

            <div style={{ marginLeft: '10px' }}>
              <button 
                onClick={() => startEditing(todo.id, todo.text)}
                style={{ marginRight: '5px', color: '#28a745', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Sửa
              </button>
              <button 
                onClick={() => deleteTodo(todo.id)}
                style={{ color: '#dc3545', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {todos.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '40px', color: '#999' }}>Ghi chép công việc!</p>
      )}
    </div>
  );
};

export default TodoApp;