import React from "react";
import AddNote from './AddNote';
import Note from "./Note";
import Context from "../Context";

export default class Notes extends React.Component {
  state = {
    addingNote: false
  }
  
  static contextType = Context;

  setAdding = () => {
    this.setState({
      addingNote: true
    })
  }

  resetAdding = () => {
    this.setState({
      addingNote: false
    })
  }

  render() {
    let filteredNotes;
    const selectedFolderId = this.props.match.params.folderId;
    if (!selectedFolderId) {
      filteredNotes = this.context.notes;
    } else {
      filteredNotes = this.context.notes.filter(
        note => note.folderId === selectedFolderId
      );
    }
    return (
      <div>
        {filteredNotes.map(note => {
          return (
            <Note
              key={note.id}
              id={note.id}
              name={note.name}
              modified={note.modified}
              history={this.props.history}
              match={this.props.match}
            />
          );
        })}
        <button onClick={() => this.setAdding()}>
          Add new note
        </button>
        {this.state.addingNote && (
          <AddNote reset={this.resetAdding} />
        )}
      </div>
    );
  }
}
