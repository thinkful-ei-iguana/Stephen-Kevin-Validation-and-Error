import React from "react";
import ValidationError from "./ValidationError";
import Context from "../Context";

export default class AddFolder extends React.Component {
  state = {
    name: ""
  };

  static contextType = Context;

  setFolder = folder => {
    console.log(folder);
    this.setState({ name: folder });
  };

  validateFolderName = () => {
    const folderName = this.state.name.trim();
    if (!folderName.length) {
      return "Folder name is required";
    }
  };

  render() {
    const { addFolder } = this.context;

    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          addFolder(this.state)
          this.props.reset();
        }}
      >
        <label htmlFor="folder-name">
          New Folder
          {this.state.touched && (
            <ValidationError message={this.validateFolderName()} />
          )}
        </label>
        <input
          type="text"
          id="folder-name"
          placeholder="folder name"
          onChange={event => {
            this.setFolder(event.target.value);
          }}
        ></input>
        <button>Submit</button>
      </form>
    );
  }
}
