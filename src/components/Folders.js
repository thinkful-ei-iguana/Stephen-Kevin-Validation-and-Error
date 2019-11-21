import React from "react";
import Folder from "./Folder";
import Context from "../Context";
import AddFolder from './AddFolder';

export default class Folders extends React.Component {
  static contextType = Context;
  state = {
    addingFolder: false
  }

  setAdding = () => {
    this.setState({addingFolder: true})
  }

  resetAdding = () => {
    this.setState({addingFolder: false})
  }

  render() {
    return (
      <div className="Folders">
        {this.context.folders.map(folder => {
          return (
            <Folder
              key={folder.id}
              id={folder.id}
              name={folder.name}
              history={this.props.history}
              match={this.props.match}
            />
          );
        })}
        <button
          onClick={() => {
            this.setAdding()
          }}
        >
        Add new folder
        </button>
        {this.state.addingFolder === true && <AddFolder reset={this.resetAdding} />}
      </div>
    );
  }
}