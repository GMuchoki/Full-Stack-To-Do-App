import db from "../db/database.js";

export const getAllTodos = (req, res) => {
    const allTodos = db.prepare("SELECT * FROM todos").all();

    res.status(200).json({
        todos: allTodos
    });
};

export const addTodo = (req, res) => {
    const { task, completed } = req.body;

    if (task === undefined || (completed !== 0 && completed !== 1)) {
        return res.status(400).json({ 
            error: "Invalid task or completed value" 
        });
    }

    const insert = db.prepare("INSERT INTO todos (task, completed) VALUES (?, ?)").run(task, completed);

    res.status(201).json({
    message: "Task added successfully", 
    id: insert.lastInsertRowid
    });

};

export const updateTodo = (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;

    const updateTask = db.prepare("UPDATE todos SET task = ?, completed = ? WHERE id = ?").run(task, completed, id);

    if (updateTask.changes > 0) {
        res.status(200).json({
        message: "Task updated successfully"
        });
    } else {
        res.status(404).json({
        error: "Task not found"
        });
    }
};

export const patchTodo = (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;

    // Fetch the current todo first
    const existing = db.prepare("SELECT * FROM todos WHERE id = ?").get(id);
    if (!existing) {
        return res.status(404).json({ error: "Task not found" });
    }

    // If a field isn't provided in the body, keep the existing value
    const newTask = task !== undefined ? task : existing.task;
    const newCompleted = completed !== undefined ? completed : existing.completed;

    const update = db.prepare(
        "UPDATE todos SET task = ?, completed = ? WHERE id = ?"
    ).run(newTask, newCompleted, id);

    if (update.changes > 0) {
        res.status(200).json({
            message: "Task updated successfully",
            updated: { id, task: newTask, completed: newCompleted }
        });
    } else {
        res.status(500).json({ error: "Failed to update task" });
    }
};


export const deleteTodo = (req, res) => {
    const { id } = req.params;

    const deleteTask = db.prepare("DELETE FROM todos WHERE id = ?").run(id);

    if (deleteTask.changes > 0) {
        res.status(200).json({
        message: "Task deleted successfully"
        });
    } else {
        res.status(404).json({
        error: "Task not found"
        });
    }
};
