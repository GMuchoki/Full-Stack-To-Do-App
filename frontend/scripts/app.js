const taskInput = document.getElementById('display');
const AddTaskBtn = document.getElementById('add-button');

fetch('http://localhost:3000/todos')
.then(response => response.json())
.then(data => {
    console.log(data);
});