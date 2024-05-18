document.addEventListener('DOMContentLoaded', () => {
    const newTodoInput = document.getElementById('new-todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');

    const renderTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('li');
            todoItem.className = todo.completed ? 'completed' : '';
            todoItem.innerHTML = `
                <span>${index + 1}. ${todo.text}</span>
                <button class="complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn">Delete</button>
            `;

            todoList.appendChild(todoItem);

            const completeBtn = todoItem.querySelector('.complete-btn');
            const deleteBtn = todoItem.querySelector('.delete-btn');

            completeBtn.addEventListener('click', () => {
                todo.completed = !todo.completed;
                saveTodos(todos);
                renderTodos();
            });

            deleteBtn.addEventListener('click', () => {
                todos.splice(index, 1);
                saveTodos(todos);
                renderTodos();
            });
        });
    };

    const saveTodos = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    addTodoBtn.addEventListener('click', () => {
        const text = newTodoInput.value.trim();
        if (text !== '') {
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.push({ text, completed: false });
            saveTodos(todos);
            newTodoInput.value = '';
            renderTodos();
        }
    });

    renderTodos();
});
