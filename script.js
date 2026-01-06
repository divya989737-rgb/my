// Select DOM Elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

// Load saved todos from localStorage
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Create a DOM node for a todo
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        textSpan.style.textDecoration = todo.completed ? 'line-through' : '';
        saveTodos();
    });

    // Text
    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 10px';
    textSpan.style.textDecoration = todo.completed ? 'line-through' : 'none';

    // Edit on double click
    textSpan.addEventListener('dblclick', () => {
        const newText = prompt('Edit todo:', todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    return li;
}

// Render the todo list
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        todoList.appendChild(node);
    });
}

// Add new todo
function addTodo() {
    const text = input.value.trim();
    if (text === '') return;

    todos.push({ text, completed: false });
    input.value = '';
    saveTodos();
    renderTodos();
}

addBtn.addEventListener('click', addTodo);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});
// Initial render
renderTodos();
