const taskInput = document.getElementById('display');
const addTaskBtn = document.getElementById('add-button');
const ol = document.getElementById('toDoList');
const todosContainer = document.querySelector('.todo-container');
const noTasksAlert = document.createElement('p');

function attachTaskActions(li, todoId) {
    
    const doneBtn = document.createElement('button');
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    doneBtn.classList.add('done-btn');

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editBtn.classList.add('edit-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.classList.add('delete-btn');

    
    li.appendChild(doneBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    // Helper to control edit state
    function toggleEditState(isCompleted) {
        if (isCompleted) {
            editBtn.disabled = true;
            editBtn.classList.add('disabled');
        } else {
            editBtn.disabled = false;
            editBtn.classList.remove('disabled');
        }
    }

    // If this task is already completed from the database
    if (li.classList.contains('completed')) {
        toggleEditState(true);
    }

    doneBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        const isCompleted = li.classList.contains('completed') ? 1 : 0;

        toggleEditState(isCompleted === 1); // toggle edit based on state

        fetch(`http://localhost:3000/todos/${todoId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: isCompleted })
        })
        .then(() => fetchTodos())
        .catch(err => console.error('Error updating task:', err));
    });

    editBtn.addEventListener('click', () => {
        if (editBtn.disabled) return; // Prevent editing if completed

        const newText = prompt('Edit your task:', li.firstChild.textContent);
        if (newText && newText.trim() !== '') {
            li.firstChild.textContent = newText;

            fetch(`http://localhost:3000/todos/${todoId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: newText })
            });
        }
    });

    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this task?')) {
            li.remove();
            fetch(`http://localhost:3000/todos/${todoId}`, {
                method: 'DELETE'
            }).then(() => fetchTodos());
        }
    });

}


//Fetch & Display Todos (READ)
function fetchTodos() {
    ol.innerHTML = "";
    noTasksAlert.textContent = "Loading tasks...";

    if (!todosContainer.contains(noTasksAlert)) {
        todosContainer.appendChild(noTasksAlert);
    }

    fetch('http://localhost:3000/todos')
        .then(response => response.json())
        .then(data => {
            if (data.todos.length === 0) {
                noTasksAlert.textContent = "No tasks yet. Add your first one!";
                if (!todosContainer.contains(noTasksAlert)) {
                    todosContainer.appendChild(noTasksAlert);
                }
                return;
            }

            data.todos.forEach((todo) => {
                const li = document.createElement('li');
                li.textContent = todo.task;

                if (todo.completed === 1) {
                    li.classList.add('completed');
                }

                // attach buttons & functionality
                attachTaskActions(li, todo.id);

                ol.appendChild(li);
            });

            if (todosContainer.contains(noTasksAlert)) {
                todosContainer.removeChild(noTasksAlert);
            }
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
            noTasksAlert.textContent = "Failed to load tasks. Try again later.";
            if (!todosContainer.contains(noTasksAlert)) {
                todosContainer.appendChild(noTasksAlert);
            }
        });
}

fetchTodos();


//Add New Todo (CREATE)
function addTodo() {
    const taskInputValue = taskInput.value.trim();

    if (!taskInputValue) {
        alert('Please enter a task.');
        return;
    }

    addTaskBtn.disabled = true;
    addTaskBtn.textContent = 'Adding...';

    fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: taskInputValue,
            completed: 0
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Server error');
        return response.json();
    })
    .then(data => {
        console.log('Task added:', data);
        taskInput.value = '';
        taskInput.focus();
        fetchTodos();
    })
    .catch(error => {
        console.error('Error adding task:', error);
        alert('Could not add task. Please try again.');
    })
    .finally(() => {
        addTaskBtn.disabled = false;
        addTaskBtn.textContent = 'Add';
    });

}

addTaskBtn.addEventListener('click', addTodo);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});