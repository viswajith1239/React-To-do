import React, { Component } from "react";
import "./TodoApp.css";



export class TodoApp extends Component {
  state = {
    input: "",
    items: [],
    isEditing: false,
    editIndex: null,
    checked: [],
    errorMessage: "", 
  };

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
      errorMessage: "", 
    });
  };

  storeItems = (event) => {
    event.preventDefault();
    const { input, items, isEditing, editIndex } = this.state;

    if (input === "") {
      this.setState({ errorMessage: "Item cannot be empty." });
      return;
    }

    if (items.includes(input) && !isEditing) {
      this.setState({ errorMessage: "Item already exists." });
      return;
    }

    if (isEditing) {
      if (items.includes(input) && items[editIndex] !== input) {
        this.setState({ errorMessage: "Item already exists." });
        return;
      }
      const updatedItems = items.map((item, index) =>
        index === editIndex ? input : item
      );
      this.setState({
        items: updatedItems,
        input: "",
        isEditing: false,
        editIndex: null,
        errorMessage: "",
      });
    } else {
      this.setState({
        items: [...items, input],
        input: "",
        checked: [...this.state.checked, false],
        errorMessage: "",
      });
    }
  };

  deleteItem = (key) => {
    this.setState({
      items: this.state.items.filter((_, index) => index !== key),
      checked: this.state.checked.filter((_, index) => index !== key),
    });
  };

  editItem = (key) => {
    this.setState({
      input: this.state.items[key],
      isEditing: true,
      editIndex: key,
    });
  };

  handleCheckboxChange = (index) => {
    const updatedChecked = [...this.state.checked];
    updatedChecked[index] = !updatedChecked[index];
    this.setState({
      checked: updatedChecked,
    });
  };

  render() {
    const { input, items, checked, errorMessage } = this.state;

    

    return (
      <div className="todo-container">
        <form className="input-section" onSubmit={this.storeItems}>
          <h1>Todo App</h1>
          <input
            type="text"
            value={input}
            onChange={this.handleChange}
            placeholder="Enter Items"
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <ul>
          {items.map((data, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() => this.handleCheckboxChange(index)}
              />
              <span className="item-text">{data}</span>
              <div className="icon-container">
                {!checked[index] && (
                  <i
                    className="fa-regular fa-edit"
                    onClick={() => this.editItem(index)}
                  ></i>
                )}
                <i
                  className="fa-regular fa-trash-can"
                  onClick={() => this.deleteItem(index)}
                ></i>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
