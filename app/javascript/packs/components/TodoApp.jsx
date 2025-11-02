import React from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import TodoItems from "./TodoItems";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
      hideCompletedTodoItems: false,
      error: null
    };
    this.getTodoItems = this.getTodoItems.bind(this);
    this.createTodoItem = this.createTodoItem.bind(this);
    this.toggleCompletedTodoItems = this.toggleCompletedTodoItems.bind(this);
  }

  toggleCompletedTodoItems() {
    this.setState({
      hideCompletedTodoItems: !this.state.hideCompletedTodoItems,
    });
  }

  createTodoItem(todoItem) {
    const todoItems = [todoItem, ...this.state.todoItems];
    this.setState({ todoItems });
  }

  componentDidMount() {
    this.getTodoItems();
  }

  getTodoItems() {
    axios
      .get("/api/v1/todo_items")
      .then((response) => {
        const todoItems = response.data;
        this.setState({ todoItems, error: null });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Failed to load todo items" });
      });
  }

  render() {
    const { todoItems, error, hideCompletedTodoItems } = this.state;
    
    // Filter todo items based on hideCompletedTodoItems state
    const filteredTodoItems = hideCompletedTodoItems 
      ? todoItems.filter(item => !item.completed)
      : todoItems;
    
    return (
      <div>
        <TodoForm createTodoItem={this.createTodoItem} />
        {error && <div className="error">{error}</div>}
        <TodoItems 
          toggleCompletedTodoItems={this.toggleCompletedTodoItems}
          hideCompletedTodoItems={hideCompletedTodoItems}
        >
          {filteredTodoItems.map((todoItem) => (
            <TodoItem 
              key={todoItem.id}
              todoItem={todoItem}
              getTodoItems={this.getTodoItems}
              hideCompletedTodoItems={hideCompletedTodoItems}
            />
          ))}
        </TodoItems>
      </div>
    );
  }
}

// Turbolinks handling
let root = null;

document.addEventListener("turbolinks:load", () => {
  const app = document.getElementById("todo-app");
  if (app) {
    if (root) {
      root.unmount();
    }
    root = createRoot(app);
    root.render(<TodoApp />);
  }
});

document.addEventListener("turbolinks:before-render", () => {
  if (root) {
    root.unmount();
    root = null;
  }
});