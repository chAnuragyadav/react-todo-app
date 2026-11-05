import React, { Component } from "react";
import "./App.css";

// Functional Component
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <span
        onClick={() => onToggle(task.id)}
        style={{
          textDecoration: task.completed
            ? "line-through"
            : "none",
          cursor: "pointer"
        }}
      >
        {task.text}
      </span>

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}

// Class Component
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: "",
      tasks: []
    };
  }

  // Handle input change
  handleChange = (e) => {
    this.setState({
      text: e.target.value
    });
  };

  // Add Task
  addTask = () => {

    const taskText = this.state.text.trim();

    // Prevent empty tasks
    if (taskText === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    this.setState({
      tasks: [...this.state.tasks, newTask],
      text: ""
    });
  };

  // Mark completed / Undo completion
  toggleTask = (id) => {

    this.setState({
      tasks: this.state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed
            }
          : task
      )
    });

  };

  // Delete Task
  deleteTask = (id) => {

    this.setState({
      tasks: this.state.tasks.filter(
        (task) => task.id !== id
      )
    });

  };

  // Render UI
  render() {

    const { text, tasks } = this.state;

    // Count completed tasks
    const completedCount = tasks.filter(
      (task) => task.completed
    ).length;

    return (

      <div className="container">

        <h1>My To-Do App</h1>

        {/* Input Box */}
        <input
          type="text"
          placeholder="Enter a task"
          value={text}
          onChange={this.handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              this.addTask();
            }
          }}
        />

        {/* Add Button */}
        <button onClick={this.addTask}>
          Add
        </button>

        {/* Task Counter */}
        <h3>
          {completedCount} of {tasks.length} tasks done
        </h3>

        {/* Display Tasks */}
        {tasks.length === 0 ? (

          <p>No tasks yet. Add one!</p>

        ) : (

          <ul>
            {tasks.map((task) => (

              <TaskItem
                key={task.id}
                task={task}
                onToggle={this.toggleTask}
                onDelete={this.deleteTask}
              />

            ))}
          </ul>

        )}

      </div>

    );
  }
}

export default App;