import React from "react";
import ValidationError from "./ValidationError";
import Context from "../Context";
import PropTypes from "prop-types"

export default class AddFolder extends React.Component {
  state = {
    name: ""
  };

  static contextType = Context;

  setFolder = (folder) => {
    this.setState({ name: folder });
  };

  validateFolderName = () => {
    const folderName = this.state.name.trim();
    if (folderName.length === 0) {
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
          New Folder:
          {this.state.name.length >= 1 && (
          <ValidationError message={this.validateFolderName()} />)}
        </label>
        <input
          type="text"
          id="folder-name"
          placeholder="folder name"
          onChange={event => {
            this.setFolder(event.target.value);
          }}
          required
        />
        <button>Submit</button>
      </form>
    );
  }
}

AddFolder.propTypes = {
  reset: PropTypes.func.isRequired
}