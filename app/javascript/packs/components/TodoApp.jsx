import React from "react";
import { createRoot } from "react-dom/client";

class TodoApp extends React.Component {
  render() {
    return <p>TodoApp</p>;
  }
}

document.addEventListener("turbolinks:load", () => {
  const app = document.getElementById("todo-app");
  if (app) {
    const root = createRoot(app);
    root.render(<TodoApp />);
  }
});
