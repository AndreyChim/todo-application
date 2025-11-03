import React from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import TodoItems from "./TodoItems";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
      hideCompletedTodoItems: false,
      isLoading: true,
      errorMessage: null,
    };
    this.getTodoItems = this.getTodoItems.bind(this);
    this.createTodoItem = this.createTodoItem.bind(this);
    this.toggleCompletedTodoItems = this.toggleCompletedTodoItems.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  handleErrors(errorMessage) {
    this.setState({ errorMessage });
  }
  clearErrors() {
    this.setState({
      errorMessage: null,
    });
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
    this.setState({ isLoading: true });
    
    axios
      .get("/api/v1/todo_items")
      .then((response) => {
        this.clearErrors();
        const todoItems = response.data;
        this.setState({ 
          todoItems, 
          isLoading: false,
          error: null 
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: {
            message: "There was an error loading your todo items...",
          },
        });
        this.setState({ 
          isLoading: false, 
          error: "Failed to load todo items" 
        });
      });
  }

  render() {
    const { todoItems, error, hideCompletedTodoItems, isLoading } = this.state;
    
    // Filter todo items based on hideCompletedTodoItems state
    const filteredTodoItems = hideCompletedTodoItems 
      ? todoItems.filter(item => !item.completed)
      : todoItems;
    
    return (
      <>
        {this.state.errorMessage && (
              <ErrorMessage errorMessage={this.state.errorMessage} />
        )}
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <TodoForm 
            createTodoItem={this.createTodoItem} 
            handleErrors={this.handleErrors}
            clearErrors={this.clearErrors}
            />
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
                  handleErrors={this.handleErrors}
                  clearErrors={this.clearErrors}
                />
              ))}
            </TodoItems>
          </div>
        )}
      </>
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